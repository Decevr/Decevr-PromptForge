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
    { label: 'Cowboy shot', natural: 'cowboy shot, mid thigh up', tag: 'cowboy shot' },
    { label: 'Bust', natural: 'bust shot', tag: 'bust' },
    { label: 'From behind', natural: 'shot from behind', tag: 'from behind' },
    { label: 'Rear three-quarter', natural: 'rear three-quarter view', tag: 'rear three-quarter view' },
    { label: 'Eye level', natural: 'eye level shot', tag: 'eye level' },
    { label: 'Bird\'s eye', natural: 'bird\'s eye view', tag: 'bird\'s eye view' },
    { label: 'Worm\'s eye', natural: 'worm\'s eye view', tag: 'worm\'s eye view' },
    { label: 'Ground level', natural: 'ground level shot', tag: 'ground level' },
    { label: 'Shoulder level', natural: 'shoulder level shot', tag: 'shoulder level' },
    { label: 'Hip level', natural: 'hip level shot', tag: 'hip level' },
    { label: 'Establishing', natural: 'establishing shot', tag: 'establishing shot' },
    { label: 'Insert detail', natural: 'insert detail shot', tag: 'insert detail' },
    { label: 'Through foreground', natural: 'shot through foreground', tag: 'through foreground' },
    { label: 'Centered', natural: 'centered composition', tag: 'centered' },
    { label: 'Off center', natural: 'off center composition', tag: 'off center' },
    { label: 'Two-shot', natural: 'two shot', tag: 'two shot' },
    { label: 'Looking back', natural: 'looking back over the shoulder', tag: 'looking back' },
    { label: 'Crane', natural: 'crane shot', tag: 'crane shot' },
    { label: 'Dolly in', natural: 'dolly in', tag: 'dolly in' },
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
    { label: '14mm ultra wide', natural: '14mm lens, ultra wide', tag: '14mm, ultra wide' },
    { label: '20mm', natural: '20mm lens', tag: '20mm' },
    { label: '28mm', natural: '28mm lens', tag: '28mm' },
    { label: '40mm', natural: '40mm lens', tag: '40mm' },
    { label: '70mm', natural: '70mm lens', tag: '70mm' },
    { label: '100mm', natural: '100mm lens', tag: '100mm' },
    { label: '200mm telephoto', natural: '200mm lens, telephoto compression', tag: '200mm, telephoto' },
    { label: 'Tilt-shift', natural: 'tilt-shift lens', tag: 'tilt-shift' },
    { label: 'Soft focus', natural: 'soft focus lens', tag: 'soft focus' },
    { label: 'Swirly bokeh', natural: 'swirly bokeh lens', tag: 'swirly bokeh' },
    { label: 'Vintage glass', natural: 'vintage lens, soft highlights', tag: 'vintage lens' },
    { label: 'Fast f/1.4', natural: 'f/1.4, very shallow depth of field', tag: 'f/1.4, shallow depth of field' },
    { label: 'f/8 sharp', natural: 'f/8, stopped down, sharp across the frame', tag: 'f/8, deep focus' },
    { label: 'Probe', natural: 'probe lens, extreme close detail', tag: 'probe lens' },
    { label: 'Split diopter', natural: 'split diopter, near and far in focus', tag: 'split diopter' },
    { label: 'Medium format', natural: 'medium format lens, smooth tones', tag: 'medium format' },
    { label: '35mm anamorphic', natural: '35mm anamorphic lens', tag: '35mm, anamorphic' },
    { label: '50mm anamorphic', natural: '50mm anamorphic lens', tag: '50mm, anamorphic' },
    { label: 'Spherical prime', natural: 'spherical prime lens', tag: 'spherical prime' },
    { label: 'Drone wide', natural: 'drone wide lens, aerial', tag: 'drone, wide angle' },
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

    const toolBar = document.getElementById('tool-bar');
    if (toolBar) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tool-btn';
      button.id = 'camera-open';
      button.textContent = 'Camera';
      button.addEventListener('click', open);
      toolBar.appendChild(button);
    }

    function open() { modal.hidden = false; }
    window.PromptForgeUI = window.PromptForgeUI || {};
    window.PromptForgeUI.openCamera = open;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
