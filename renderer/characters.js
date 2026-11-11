(function () {
  const STORAGE_KEY = 'promptforge.characters.v1';
  const FIELDS = [
    { key: 'name', label: 'Name', required: true },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'race', label: 'Race' },
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
      '<div class="character-random">',
      '<h3>Random character</h3>',
      '<p class="hint">Creates an adult, 21 or older, and saves them to the list.</p>',
      '<div class="character-actions">',
      '<button type="button" class="generate" id="char-random-female">Random female</button>',
      '<button type="button" class="generate" id="char-random-male">Random male</button>',
      '</div></div>',
      '<h3 id="char-form-title">New character</h3>',
      FIELDS.map(function (field) {
        const placeholder = field.key === 'age' ? ' placeholder="25"' : '';
        return '<label><span>' + field.label + (field.required ? ' *' : '') + '</span><input name="' + field.key + '" type="text"' + placeholder + (field.required ? ' required' : '') + ' /></label>';
      }).join(''),
      '<p class="hint" id="char-age-note" hidden></p>',
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
    const selected = [];

    function renderSelected() {
      const host = document.getElementById('selected-character-list');
      if (!host) return;
      if (!selected.length) {
        host.innerHTML = '<span class="selected-empty">No characters selected</span>';
        return;
      }
      host.innerHTML = selected.map(function (item) {
        return '<button type="button" class="char-chip" data-remove-char="' + escapeHtml(item.id) + '">' + escapeHtml(item.name) + '<span aria-hidden="true">×</span></button>';
      }).join('');
    }

    function removeSelected(id) {
      const index = selected.findIndex(function (item) { return item.id === id; });
      if (index < 0) return;
      const item = selected[index];
      const input = document.getElementById('prompt-input');
      if (input && item.snippet) {
        const snippet = item.snippet.replace(/[.\s]*$/, '');
        const at = input.value.indexOf(snippet);
        if (at >= 0) {
          let next = input.value.slice(0, at) + input.value.slice(at + snippet.length);
          next = next.replace(/^,\s*/, '').replace(/,\s*,/g, ', ').replace(/\s+,/g, ',').trim();
          input.value = next;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      selected.splice(index, 1);
      renderSelected();
    }

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

    function pickOne(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    function rollCharacter(kind) {
      const female = kind === 'female';
      const names = female
        ? ['Elena', 'Mira', 'Naomi', 'Sofia', 'Hana', 'Ingrid', 'Amara', 'Lila', 'Celeste', 'Nora']
        : ['Adrian', 'Marcus', 'Kenji', 'Elias', 'Omar', 'Leo', 'Julian', 'Andre', 'Soren', 'Malik'];
      const races = female
        ? ['East Asian', 'Black', 'White', 'Latina', 'South Asian', 'Middle Eastern', 'mixed']
        : ['East Asian', 'Black', 'White', 'Latino', 'South Asian', 'Middle Eastern', 'mixed'];
      const hair = pickOne(['long', 'short', 'wavy', 'straight']) + ' ' + pickOne(['black', 'brown', 'blonde', 'red', 'silver', 'auburn']) + ' hair';
      const eyes = pickOne(['blue', 'green', 'brown', 'amber', 'gray', 'hazel']) + ' eyes';
      const skin = pickOne(['fair', 'tan', 'brown', 'deep brown', 'olive']);
      const age = String(pickOne([21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 35]));
      return {
        name: pickOne(names),
        age: age,
        gender: female ? 'female' : 'male',
        race: pickOne(races),
        hair: hair,
        eyes: eyes,
        face: pickOne(female
          ? ['soft features', 'sharp features', 'freckles', 'defined cheekbones']
          : ['sharp jaw', 'soft features', 'light stubble', 'defined cheekbones']),
        makeup: female ? pickOne(['natural makeup', 'red lipstick', 'no makeup', 'smoky eyes']) : '',
        nails: female ? pickOne(['red nails', 'nude nails', 'black nails']) : '',
        skin: skin + ' skin',
        body: pickOne(female ? ['slim', 'athletic', 'curvy', 'hourglass'] : ['lean', 'athletic', 'broad', 'tall']),
        breasts: female ? pickOne(['small breasts', 'medium breasts', 'large breasts']) : '',
        ass: pickOne(['toned ass', 'round ass', 'full ass']),
        vagina: female ? pickOne(['shaved', 'natural']) : '',
        penis: female ? '' : pickOne(['average penis', 'large penis']),
        otherBody: '',
        clothing: pickOne(female
          ? ['red dress', 'black coat', 'silk gown', 'white blouse']
          : ['black coat', 'dark suit', 'white shirt', 'leather jacket']),
        style: pickOne(['anime', 'semi-realistic', 'photoreal']),
      };
    }

    function saveRandom(kind) {
      const data = rollCharacter(kind);
      data.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
      const chars = load();
      chars.unshift(data);
      save(chars);
      renderList();
      fillForm(data);
    }

    function fillForm(char) {
      FIELDS.forEach(function (field) {
        form.elements[field.key].value = char ? (char[field.key] || '') : '';
      });
      title.textContent = char ? 'Edit character' : 'New character';
      editingId = char ? char.id : null;
      const ageNote = document.getElementById('char-age-note');
      if (ageNote) ageNote.hidden = true;
    }

    function insertCharacter(char) {
      const input = document.getElementById('prompt-input');
      if (!input) return;
      const desc = buildDescription(char, activeFormat());
      if (!desc) return;
      const already = selected.some(function (item) { return item.id === char.id; });
      if (!already) {
        const current = input.value.trim();
        const snippet = desc.replace(/[.\s]*$/, '');
        input.value = current ? snippet + ', ' + current : desc;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        selected.push({ id: char.id, name: char.name, snippet: snippet });
        renderSelected();
      }
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
        removeSelected(id);
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
      const ageNote = document.getElementById('char-age-note');
      const ages = String(data.age || '').match(/\d+/g) || [];
      if (ages.some(function (value) { return Number(value) < 21; })) {
        ageNote.hidden = false;
        ageNote.textContent = 'Age needs to be 21 or older.';
        return;
      }
      ageNote.hidden = true;
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
    document.getElementById('char-random-female').addEventListener('click', function () { saveRandom('female'); });
    document.getElementById('char-random-male').addEventListener('click', function () { saveRandom('male'); });
    document.getElementById('char-close').addEventListener('click', function () { modal.hidden = true; });
    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.hidden = true;
    });

    const toolBar = document.getElementById('tool-bar');
    if (toolBar) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tool-btn';
      button.id = 'characters-open';
      button.textContent = 'Characters';
      button.addEventListener('click', open);
      toolBar.appendChild(button);
    }

    function open() {
      renderList();
      modal.hidden = false;
    }

    const selectedHost = document.getElementById('selected-character-list');
    if (selectedHost) {
      selectedHost.addEventListener('click', function (event) {
        const chip = event.target.closest('[data-remove-char]');
        if (!chip) return;
        removeSelected(chip.getAttribute('data-remove-char'));
      });
    }

    window.PromptForgeUI = window.PromptForgeUI || {};
    window.PromptForgeUI.openCharacters = open;
    renderList();
    renderSelected();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
