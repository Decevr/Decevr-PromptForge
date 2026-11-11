(function () {
  const STORAGE_KEY = 'promptforge.characters.v1';
  const FIELDS = [
    { key: 'name', label: 'Name', required: true },
    { key: 'hair', label: 'Hair' },
    { key: 'eyes', label: 'Eyes' },
    { key: 'face', label: 'Face / Features' },
    { key: 'makeup', label: 'Makeup' },
    { key: 'nails', label: 'Nail polish' },
    { key: 'skin', label: 'Skin' },
    { key: 'body', label: 'Body type / figure' },
    { key: 'breasts', label: 'Breasts' },
    { key: 'ass', label: 'Ass' },
    { key: 'vagina', label: 'Vagina' },
    { key: 'penis', label: 'Penis' },
    { key: 'otherBody', label: 'Other body notes' },
    { key: 'clothing', label: 'Default clothing / state' },
    { key: 'style', label: 'Style notes' },
  ];

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (error) {
      return [];
    }
  }

  function save(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function escapeHtml(text) {
    return String(text || '').replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function activeFormat() {
    const formatSelect = document.getElementById('format-select');
    if (formatSelect && formatSelect.value && formatSelect.value !== 'auto') return formatSelect.value;
    let modelId = '';
    try {
      modelId = (JSON.parse(localStorage.getItem('promptforge.v1') || '{}') || {}).modelId || '';
    } catch (error) {
      modelId = '';
    }
    const models = (window.PF_MODELS && window.PF_MODELS.models) || [];
    const model = models.find(function (item) { return item.id === modelId; }) || models[0];
    return (model && model.preferredFormat) || 'natural';
  }

  function fieldText(value, format) {
    const clean = String(value || '').replace(/[,;]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    if (format === 'danbooru') return clean.replace(/ /g, '_');
    return clean;
  }

  function buildDescription(char, format) {
    const parts = [];
    FIELDS.forEach(function (field) {
      if (field.key === 'name') return;
      const text = fieldText(char[field.key], format);
      if (text) parts.push(text);
    });
    const name = fieldText(char.name, format);
    if (format === 'natural') {
      const body = [(char.name || '').trim()].concat(parts).filter(Boolean).join(', ');
      return body ? body.replace(/[.\s]*$/, '') + '.' : '';
    }
    return [name].concat(parts).filter(Boolean).join(', ');
  }

  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'character-modal';
    modal.className = 'character-modal';
    modal.hidden = true;
    modal.innerHTML = [
      '<div class="character-dialog" role="dialog" aria-labelledby="char-title">',
      '<div class="character-head"><h2 id="char-title">Character Templates</h2>',
      '<button type="button" class="text-btn" id="char-close">Close</button></div>',
      '<div class="character-body">',
      '<div class="character-list" id="character-list"></div>',
      '<form class="character-form" id="character-form">',
      '<h3 id="char-form-title">New character</h3>',
      FIELDS.map(function (field) {
        return '<label><span>' + field.label + (field.required ? ' *' : '') + '</span><input name="' + field.key + '" type="text"' + (field.required ? ' required' : '') + ' /></label>';
      }).join(''),
      '<div class="character-actions"><button type="submit" class="generate">Save character</button>',
      '<button type="button" class="text-btn" id="char-new">New</button></div>',
      '</form></div></div>',
    ].join('');
    document.body.appendChild(modal);
    return modal;
  }

  function init() {
    const modal = createModal();
    const listEl = document.getElementById('character-list');
    const form = document.getElementById('character-form');
    const title = document.getElementById('char-form-title');
    let editingId = null;

    function renderList() {
      const chars = load();
      if (!chars.length) {
        listEl.innerHTML = '<p class="empty">No characters yet. Create one on the right.</p>';
        return;
      }
      listEl.innerHTML = chars.map(function (char) {
        return '<article class="history-card"><div class="row"><strong>' + escapeHtml(char.name || 'Unnamed') + '</strong></div><div class="row" style="margin-top:8px"><button type="button" class="load-btn" data-insert="' + escapeHtml(char.id) + '">Insert</button><button type="button" class="load-btn" data-edit="' + escapeHtml(char.id) + '">Edit</button><button type="button" class="load-btn" data-delete="' + escapeHtml(char.id) + '">Delete</button></div></article>';
      }).join('');
    }

    function fillForm(char) {
      FIELDS.forEach(function (field) {
        form.elements[field.key].value = char ? (char[field.key] || '') : '';
      });
      title.textContent = char ? 'Edit character' : 'New character';
      editingId = char ? char.id : null;
    }

    function insertCharacter(char) {
      const input = document.getElementById('prompt-input');
      if (!input) return;
      const desc = buildDescription(char, activeFormat());
      if (!desc) return;
      const current = input.value.trim();
      input.value = current ? desc.replace(/[.\s]*$/, '') + ', ' + current : desc;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    }

    listEl.addEventListener('click', function (event) {
      const insertBtn = event.target.closest('[data-insert]');
      const editBtn = event.target.closest('[data-edit]');
      const deleteBtn = event.target.closest('[data-delete]');
      const chars = load();
      if (insertBtn) {
        const char = chars.find(function (item) { return item.id === insertBtn.getAttribute('data-insert'); });
        if (char) insertCharacter(char);
        modal.hidden = true;
      } else if (editBtn) {
        fillForm(chars.find(function (item) { return item.id === editBtn.getAttribute('data-edit'); }));
      } else if (deleteBtn) {
        if (!confirm('Delete this character?')) return;
        const id = deleteBtn.getAttribute('data-delete');
        save(chars.filter(function (item) { return item.id !== id; }));
        renderList();
        if (editingId === id) fillForm(null);
      }
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const data = {};
      FIELDS.forEach(function (field) {
        data[field.key] = form.elements[field.key].value.trim();
      });
      if (!data.name) return;
      const chars = load();
      if (editingId) {
        const index = chars.findIndex(function (item) { return item.id === editingId; });
        if (index >= 0) chars[index] = Object.assign(chars[index], data);
      } else {
        data.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
        chars.unshift(data);
      }
      save(chars);
      renderList();
      fillForm(null);
    });

    document.getElementById('char-new').addEventListener('click', function () { fillForm(null); });
    document.getElementById('char-close').addEventListener('click', function () { modal.hidden = true; });
    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.hidden = true;
    });

    const toggles = document.querySelector('.toggles');
    if (toggles) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'text-btn';
      button.id = 'characters-open';
      button.textContent = 'Characters';
      button.addEventListener('click', open);
      toggles.appendChild(button);
    }

    function open() {
      renderList();
      modal.hidden = false;
    }

    window.PromptForgeUI = window.PromptForgeUI || {};
    window.PromptForgeUI.openCharacters = open;
    renderList();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
