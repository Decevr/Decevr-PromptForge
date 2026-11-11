(function () {
  const ANGLES = [
    { label: 'Extreme close-up', natural: 'extreme close-up', tag: 'extreme close-up' },
    { label: 'Close-up', natural: 'close-up', tag: 'close-up' },
    { label: 'Medium close-up', natural: 'medium close-up', tag: 'medium close-up' },
    { label: 'Medium shot', natural: 'medium shot', tag: 'medium shot' },
    { label: 'Upper body', natural: 'upper body shot', tag: 'upper body' },
    { label: 'Full body', natural: 'full body shot', tag: 'full body' },
    { label: 'Wide shot', natural: 'wide shot', tag: 'wide shot' },
    { label: 'Low angle', natural: 'low angle shot', tag: 'low angle' },
    { label: 'High angle', natural: 'high angle shot', tag: 'high angle' },
    { label: 'From above', natural: 'shot from above', tag: 'from above' },
    { label: 'From below', natural: 'shot from below', tag: 'from below' },
    { label: 'Over the shoulder', natural: 'over the shoulder shot', tag: 'over shoulder' },
    { label: 'POV', natural: 'point of view shot', tag: 'pov' },
    { label: 'Dutch angle', natural: 'dutch angle', tag: 'dutch angle' },
    { label: 'Profile', natural: 'profile view', tag: 'profile' },
    { label: 'Three-quarter', natural: 'three-quarter view', tag: 'three-quarter view' },
  ];

  const LENSES = [
    { label: '24mm wide', natural: '24mm lens, wide angle', tag: '24mm, wide angle' },
    { label: '35mm', natural: '35mm lens', tag: '35mm' },
    { label: '50mm', natural: '50mm lens', tag: '50mm' },
    { label: '85mm portrait', natural: '85mm lens, portrait', tag: '85mm, portrait' },
    { label: '135mm telephoto', natural: '135mm lens, telephoto', tag: '135mm, telephoto' },
    { label: 'Macro', natural: 'macro lens, extreme close detail', tag: 'macro' },
    { label: 'Fisheye', natural: 'fisheye lens', tag: 'fisheye' },
    { label: 'Shallow DOF', natural: 'shallow depth of field, bokeh', tag: 'shallow depth of field, bokeh' },
    { label: 'Deep focus', natural: 'deep focus, everything sharp', tag: 'deep focus' },
    { label: 'Cinematic anamorphic', natural: 'anamorphic lens, cinematic', tag: 'anamorphic, cinematic' },
  ];

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

  function escapeHtml(text) {
    return String(text || '').replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'camera-modal';
    modal.className = 'character-modal';
    modal.hidden = true;
    modal.innerHTML = [
      '<div class="character-dialog" role="dialog" aria-labelledby="camera-title">',
      '<div class="character-head"><h2 id="camera-title">Camera Angles & Lenses</h2>',
      '<button type="button" class="text-btn" id="camera-close">Close</button></div>',
      '<div class="character-body character-split">',
      '<div class="pane"><h3>Angles</h3><div id="angle-list" class="choice-list"></div></div>',
      '<div class="pane"><h3>Lenses</h3><div id="lens-list" class="choice-list"></div></div>',
      '</div></div>',
    ].join('');
    document.body.appendChild(modal);
    return modal;
  }

  function init() {
    const modal = createModal();
    const angleList = document.getElementById('angle-list');
    const lensList = document.getElementById('lens-list');

    function renderButtons(container, items, type) {
      container.innerHTML = items.map(function (item, index) {
        return '<button type="button" class="load-btn" data-type="' + type + '" data-index="' + index + '">' + escapeHtml(item.label) + '</button>';
      }).join('');
    }

    renderButtons(angleList, ANGLES, 'angle');
    renderButtons(lensList, LENSES, 'lens');

    function insertText(text) {
      const input = document.getElementById('prompt-input');
      if (!input || !text) return;
      const current = input.value.trim();
      input.value = current ? current.replace(/[.\s]*$/, '') + ', ' + text : text;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    }

    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.hidden = true;
        return;
      }
      const button = event.target.closest('[data-type]');
      if (!button) return;
      const type = button.getAttribute('data-type');
      const index = Number(button.getAttribute('data-index'));
      const item = type === 'angle' ? ANGLES[index] : LENSES[index];
      if (!item) return;
      const format = activeFormat();
      insertText(format === 'natural' ? item.natural : item.tag);
      modal.hidden = true;
    });

    document.getElementById('camera-close').addEventListener('click', function () { modal.hidden = true; });

    const toggles = document.querySelector('.toggles');
    if (toggles) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'text-btn';
      button.id = 'camera-open';
      button.textContent = 'Camera';
      button.addEventListener('click', open);
      toggles.appendChild(button);
    }

    function open() { modal.hidden = false; }
    window.PromptForgeUI = window.PromptForgeUI || {};
    window.PromptForgeUI.openCamera = open;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
