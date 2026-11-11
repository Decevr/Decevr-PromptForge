(function () {
  const PRESETS_KEY = 'promptforge.negPresets.v1';
  const CATEGORIES = [
    { id: 'anatomy', label: 'Bad anatomy', tags: 'bad anatomy, bad hands, extra digits, missing fingers, extra limbs, missing limbs, malformed hands' },
    { id: 'quality', label: 'Low quality', tags: 'lowres, worst quality, bad quality, blurry, jpeg artifacts, pixelated' },
    { id: 'text', label: 'Text / watermarks', tags: 'watermark, text, signature, username, logo' },
    { id: 'video', label: 'Video issues', tags: 'flicker, morphing, warped anatomy, jitter, duplicated frames, low detail' },
    { id: 'extra', label: 'Extra unwanted', tags: 'extra people, multiple views, cropped, out of frame' },
  ];

  function loadPresets() {
    try { return JSON.parse(localStorage.getItem(PRESETS_KEY) || '[]'); }
    catch (error) { return []; }
  }

  function savePresets(list) {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(list));
  }

  function escapeHtml(text) {
    return String(text || '').replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function currentModel() {
    let modelId = '';
    try {
      modelId = (JSON.parse(localStorage.getItem('promptforge.v1') || '{}') || {}).modelId || '';
    } catch (error) {
      modelId = '';
    }
    const models = (window.PF_MODELS && window.PF_MODELS.models) || [];
    return models.find(function (item) { return item.id === modelId; }) || models[0] || null;
  }

  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'negative-modal';
    modal.className = 'character-modal';
    modal.hidden = true;
    modal.innerHTML = [
      '<div class="character-dialog" role="dialog" aria-labelledby="neg-title">',
      '<div class="character-head"><h2 id="neg-title">Negative Prompt Builder</h2>',
      '<button type="button" class="text-btn" id="neg-close">Close</button></div>',
      '<div class="character-body character-split">',
      '<div class="pane"><h3>Categories</h3><div id="neg-categories" class="choice-list"></div>',
      '<label class="stack"><span>Custom negative tags</span><input id="neg-custom" type="text" placeholder="extra fingers, cropped" /></label>',
      '<p class="hint" id="neg-preview">Added to the model negative when Negative is on.</p>',
      '<button type="button" class="generate" id="neg-apply">Apply negative</button></div>',
      '<div class="pane"><h3>Saved presets</h3><div id="neg-presets"></div>',
      '<label class="stack"><span>Preset name</span><input id="neg-preset-name" type="text" placeholder="My anatomy block" /></label>',
      '<button type="button" class="text-btn" id="neg-save-preset">Save current as preset</button></div>',
      '</div></div>',
    ].join('');
    document.body.appendChild(modal);
    return modal;
  }

  function init() {
    const modal = createModal();
    const catsEl = document.getElementById('neg-categories');
    const presetsEl = document.getElementById('neg-presets');
    const customInput = document.getElementById('neg-custom');
    const nameInput = document.getElementById('neg-preset-name');
    const preview = document.getElementById('neg-preview');

    catsEl.innerHTML = CATEGORIES.map(function (category) {
      return '<label class="check"><input type="checkbox" data-cat="' + category.id + '" /> ' + escapeHtml(category.label) + '</label>';
    }).join('');

    function getSelectedTags() {
      const selected = [];
      CATEGORIES.forEach(function (category) {
        const box = catsEl.querySelector('[data-cat="' + category.id + '"]');
        if (box && box.checked) selected.push(category.tags);
      });
      const custom = customInput.value.trim();
      if (custom) selected.push(custom);
      return selected.join(', ');
    }

    function renderPreview() {
      const tags = getSelectedTags();
      preview.textContent = tags
        ? 'Will add: ' + tags
        : 'Added to the model negative when Negative is on.';
    }

    function renderPresets() {
      const presets = loadPresets();
      if (!presets.length) {
        presetsEl.innerHTML = '<p class="empty">No presets yet.</p>';
        return;
      }
      presetsEl.innerHTML = presets.map(function (preset, index) {
        return '<div class="row preset-row"><span>' + escapeHtml(preset.name) + '</span><button type="button" class="load-btn" data-load-preset="' + index + '">Load</button><button type="button" class="load-btn" data-del-preset="' + index + '">Del</button></div>';
      }).join('');
    }

    document.getElementById('neg-apply').addEventListener('click', function () {
      const tags = getSelectedTags();
      if (!tags) return;
      document.dispatchEvent(new CustomEvent('promptforge:negative', { detail: { tags: tags } }));
      modal.hidden = true;
    });

    document.getElementById('neg-save-preset').addEventListener('click', function () {
      const name = nameInput.value.trim();
      const tags = getSelectedTags();
      if (!name || !tags) return;
      const presets = loadPresets();
      presets.unshift({ name: name, tags: tags });
      savePresets(presets);
      renderPresets();
      nameInput.value = '';
    });

    presetsEl.addEventListener('click', function (event) {
      const loadBtn = event.target.closest('[data-load-preset]');
      const delBtn = event.target.closest('[data-del-preset]');
      const presets = loadPresets();
      if (loadBtn) {
        const preset = presets[Number(loadBtn.getAttribute('data-load-preset'))];
        if (!preset) return;
        catsEl.querySelectorAll('input').forEach(function (box) { box.checked = false; });
        customInput.value = preset.tags;
        renderPreview();
      } else if (delBtn) {
        if (!confirm('Delete this preset?')) return;
        presets.splice(Number(delBtn.getAttribute('data-del-preset')), 1);
        savePresets(presets);
        renderPresets();
      }
    });

    catsEl.addEventListener('change', renderPreview);
    customInput.addEventListener('input', renderPreview);
    document.getElementById('neg-close').addEventListener('click', function () { modal.hidden = true; });
    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.hidden = true;
    });

    const toggles = document.querySelector('.toggles');
    if (toggles) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'text-btn';
      button.id = 'negatives-open';
      button.textContent = 'Negatives';
      button.addEventListener('click', open);
      toggles.appendChild(button);
    }

    function open() {
      const model = currentModel();
      const anyChecked = catsEl.querySelector('input:checked');
      if (!anyChecked && !customInput.value.trim() && model && model.category === 'video') {
        const video = catsEl.querySelector('[data-cat="video"]');
        if (video) video.checked = true;
      }
      renderPresets();
      renderPreview();
      modal.hidden = false;
    }

    window.PromptForgeUI = window.PromptForgeUI || {};
    window.PromptForgeUI.openNegatives = open;
    renderPresets();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
