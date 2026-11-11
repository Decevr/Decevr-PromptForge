(function () {
  const STORAGE_KEY = 'promptforge.characters.v1';
  const FIELDS = [
    { key: 'name', label: 'Name', required: true },
    { key: 'age', label: 'Age', placeholder: '25' },
    { key: 'gender', label: 'Gender' },
    { key: 'race', label: 'Race', placeholder: 'elf, orc, anthro fox, or any race' },
    { key: 'hair', label: 'Hair', section: 'Look' },
    { key: 'eyes', label: 'Eyes' },
    { key: 'face', label: 'Face / Features' },
    { key: 'lips', label: 'Lips' },
    { key: 'makeup', label: 'Makeup' },
    { key: 'nails', label: 'Nail polish' },
    { key: 'skin', label: 'Skin' },
    { key: 'freckles', label: 'Freckles', section: 'Marks, piercings, and tattoos', placeholder: 'light freckles across the nose' },
    { key: 'moles', label: 'Moles / beauty marks', placeholder: 'a small mole near the mouth' },
    { key: 'scars', label: 'Scars' },
    { key: 'birthmarks', label: 'Birthmarks' },
    { key: 'piercings', label: 'Piercings', placeholder: 'silver navel piercing' },
    { key: 'tattoos', label: 'Tattoos', placeholder: 'a small tattoo on the hip' },
    { key: 'body', label: 'Body type / figure', section: 'Body' },
    { key: 'breasts', label: 'Breasts' },
    { key: 'nipples', label: 'Nipple color', placeholder: 'pink, brown, dark' },
    { key: 'ass', label: 'Ass' },
    { key: 'hips', label: 'Hips' },
    { key: 'waist', label: 'Waist' },
    { key: 'stomach', label: 'Stomach' },
    { key: 'thighs', label: 'Thighs' },
    { key: 'shoulders', label: 'Shoulders' },
    { key: 'back', label: 'Back' },
    { key: 'arms', label: 'Arms' },
    { key: 'hands', label: 'Hands' },
    { key: 'feet', label: 'Feet' },
    { key: 'vagina', label: 'Vagina' },
    { key: 'penis', label: 'Penis' },
    { key: 'pubic', label: 'Pubic hair' },
    { key: 'otherBody', label: 'Other body notes' },
    { key: 'clothing', label: 'Default clothing / state', section: 'Wardrobe' },
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

  const RACE_GROUPS = [
    { label: 'Human', values: ['East Asian', 'Black', 'White', 'Latina', 'Latino', 'South Asian', 'Middle Eastern', 'mixed'] },
    { label: 'Fantasy', values: ['elf', 'high elf', 'wood elf', 'dark elf', 'drow', 'half-elf', 'orc', 'half-orc', 'dwarf', 'gnome', 'halfling', 'fairy', 'nymph', 'dryad', 'satyr', 'centaur', 'minotaur', 'harpy', 'lamia', 'naga', 'mermaid', 'siren', 'goblin', 'troll', 'ogre', 'giant', 'tiefling', 'aasimar', 'dragonborn', 'dragon', 'kobold', 'lizardfolk', 'kitsune', 'oni', 'demon', 'succubus', 'incubus', 'angel', 'vampire', 'werewolf', 'golem', 'elemental', 'slime'] },
    { label: 'Furry', values: ['anthro', 'furry', 'kemono', 'scalie', 'anthro cat', 'anthro fox', 'anthro wolf', 'anthro bunny', 'anthro dog', 'anthro lion', 'anthro tiger', 'anthro bear', 'anthro deer', 'anthro horse', 'anthro dragon', 'anthro shark', 'anthro snake', 'anthro mouse', 'anthro raccoon', 'anthro hyena', 'anthro cow', 'anthro goat', 'anthro panda', 'anthro otter', 'anthro bat', 'anthro bird', 'anthro lizard', 'catgirl', 'foxgirl', 'wolfgirl', 'bunnygirl', 'feline', 'canine', 'vulpine', 'lupine'] },
  ];

  function renderFieldInputs() {
    let html = '';
    let section = '';
    FIELDS.forEach(function (field) {
      if (field.section && field.section !== section) {
        section = field.section;
        html += '<h3 class="field-section">' + escapeHtml(section) + '</h3>';
      }
      const placeholder = field.placeholder ? ' placeholder="' + escapeHtml(field.placeholder) + '"' : '';
      html += '<label><span>' + escapeHtml(field.label) + (field.required ? ' *' : '') + '</span><input name="' + field.key + '" type="text"' + placeholder + (field.required ? ' required' : '') + (field.key === 'race' ? ' list="race-options" autocomplete="off"' : '') + ' />';
      if (field.key === 'race') {
        html += '<span class="hint">Any typed race works, including fantasy and furry.</span>';
        html += '<datalist id="race-options">';
        RACE_GROUPS.forEach(function (group) {
          group.values.forEach(function (value) {
            html += '<option value="' + escapeHtml(value) + '" label="' + escapeHtml(group.label) + '"></option>';
          });
        });
        html += '</datalist>';
      }
      html += '</label>';
    });
    return html;
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
      renderFieldInputs(),
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
          ? ['soft features', 'sharp features', 'defined cheekbones']
          : ['sharp jaw', 'soft features', 'light stubble', 'defined cheekbones']),
        lips: pickOne(['full lips', 'soft lips', 'defined lips']),
        makeup: female ? pickOne(['natural makeup', 'red lipstick', 'no makeup', 'smoky eyes']) : '',
        nails: female ? pickOne(['red nails', 'nude nails', 'black nails']) : '',
        skin: skin + ' skin',
        freckles: pickOne(['', '', 'light freckles across the nose', 'freckles on the shoulders', 'freckles across the cheeks']),
        moles: pickOne(['', '', 'a small mole near the mouth']),
        scars: '',
        birthmarks: '',
        piercings: pickOne(['', '', 'ear piercings', 'a navel piercing', 'a nipple piercing']),
        tattoos: pickOne(['', '', '', 'a small tattoo on the hip', 'a fine line tattoo on the shoulder']),
        body: pickOne(female ? ['slim', 'athletic', 'curvy', 'hourglass'] : ['lean', 'athletic', 'broad', 'tall']),
        breasts: female ? pickOne(['small breasts', 'medium breasts', 'large breasts']) : '',
        nipples: pickOne(['pink nipples', 'brown nipples', 'dark nipples', 'pale nipples']),
        ass: pickOne(['toned ass', 'round ass', 'full ass']),
        hips: pickOne(['narrow hips', 'wide hips', 'full hips']),
        waist: pickOne(['slim waist', 'narrow waist', 'soft waist']),
        stomach: pickOne(['flat stomach', 'soft stomach', 'toned stomach']),
        thighs: pickOne(['slim thighs', 'thick thighs', 'toned thighs']),
        shoulders: pickOne(['slim shoulders', 'soft shoulders', 'broad shoulders']),
        back: '',
        arms: '',
        hands: '',
        feet: '',
        vagina: female ? pickOne(['shaved', 'natural']) : '',
        penis: female ? '' : pickOne(['average penis', 'large penis']),
        pubic: pickOne(['shaved', 'trimmed', 'natural']),
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
