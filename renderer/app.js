(function () {
  const STORAGE_KEY = 'promptforge.v1';
  const FORMAT_LABEL = {
    danbooru: 'Danbooru',
    gelbooru: 'Gelbooru',
    natural: 'Natural language',
  };

  const models = (window.PF_MODELS && window.PF_MODELS.models) || [];
  const engine = window.PF;

  const els = {
    version: document.getElementById('version'),
    form: document.getElementById('form'),
    input: document.getElementById('prompt-input'),
    spellLayer: document.getElementById('spell-layer'),
    spellHint: document.getElementById('spell-hint'),
    modelButton: document.getElementById('model-button'),
    modelButtonLabel: document.getElementById('model-button-label'),
    modelPanel: document.getElementById('model-panel'),
    modelSearch: document.getElementById('model-search'),
    modelList: document.getElementById('model-list'),
    format: document.getElementById('format-select'),
    formatHint: document.getElementById('format-hint'),
    spell: document.getElementById('spell-toggle'),
    improve: document.getElementById('improve-toggle'),
    quality: document.getElementById('quality-toggle'),
    ultra: document.getElementById('ultra-toggle'),
    negative: document.getElementById('negative-toggle'),
    error: document.getElementById('form-error'),
    results: document.getElementById('results'),
    resultsMeta: document.getElementById('results-meta'),
    notes: document.getElementById('change-notes'),
    copyAll: document.getElementById('copy-all'),
    favorites: document.getElementById('favorites-list'),
    history: document.getElementById('history-list'),
    clearFavorites: document.getElementById('clear-favorites'),
    clearHistory: document.getElementById('clear-history'),
    exportText: document.getElementById('export-text'),
    exportJson: document.getElementById('export-json'),
  };

  const saved = loadStore();
  const state = {
    modelId: saved.modelId && models.some(function (model) { return model.id === saved.modelId; })
      ? saved.modelId
      : (models[0] && models[0].id),
    formatOverride: saved.formatOverride || 'auto',
    correctSpelling: saved.correctSpelling !== false,
    improvePrompt: saved.improvePrompt !== false,
    addQuality: saved.addQuality !== false,
    ultraDetailed: saved.ultraDetailed === true,
    includeNegative: typeof saved.includeNegative === 'boolean'
      ? saved.includeNegative
      : Boolean(models[0] && models[0].negativeDefault),
    query: '',
    highlight: 0,
    open: false,
    results: [],
    negative: '',
    settingsLine: '',
    formatUsed: '',
    mode: '',
    notes: [],
    history: saved.history || [],
    favorites: saved.favorites || [],
    activeHistoryId: null,
  };

  if (window.promptforge && window.promptforge.version) {
    els.version.textContent = 'v' + window.promptforge.version;
  }

  els.format.value = state.formatOverride;
  els.spell.checked = state.correctSpelling;
  els.improve.checked = state.improvePrompt;
  els.quality.checked = state.addQuality;
  els.ultra.checked = state.ultraDetailed;
  els.negative.checked = state.includeNegative;
  renderModelButton();
  renderFormatHint();
  renderHistory();
  renderFavorites();

  els.form.addEventListener('submit', function (event) {
    event.preventDefault();
    generate();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      generate();
    }
    if (event.key === 'Escape' && state.open) closeModels();
  });

  els.modelButton.addEventListener('click', function () {
    if (state.open) closeModels();
    else openModels();
  });

  els.modelSearch.addEventListener('input', function () {
    state.query = els.modelSearch.value;
    state.highlight = 0;
    renderModelList();
  });

  els.modelSearch.addEventListener('keydown', function (event) {
    const flat = filteredModels();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      state.highlight = Math.min(flat.length - 1, state.highlight + 1);
      renderModelList();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      state.highlight = Math.max(0, state.highlight - 1);
      renderModelList();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (flat[state.highlight]) selectModel(flat[state.highlight].id);
    }
  });

  document.addEventListener('click', function (event) {
    if (!state.open) return;
    if (!document.getElementById('model-combo').contains(event.target)) closeModels();
  });

  els.format.addEventListener('change', function () {
    state.formatOverride = els.format.value;
    renderFormatHint();
    saveStore();
  });

  els.spell.addEventListener('change', function () {
    state.correctSpelling = els.spell.checked;
    saveStore();
    renderSpellcheck();
  });

  els.input.addEventListener('input', renderSpellcheck);
  els.input.addEventListener('scroll', function () {
    els.spellLayer.scrollTop = els.input.scrollTop;
    els.spellLayer.scrollLeft = els.input.scrollLeft;
  });

  els.improve.addEventListener('change', function () {
    state.improvePrompt = els.improve.checked;
    saveStore();
  });

  els.quality.addEventListener('change', function () {
    state.addQuality = els.quality.checked;
    saveStore();
  });

  els.ultra.addEventListener('change', function () {
    state.ultraDetailed = els.ultra.checked;
    saveStore();
  });

  els.negative.addEventListener('change', function () {
    state.includeNegative = els.negative.checked;
    saveStore();
  });

  els.copyAll.addEventListener('click', function () {
    copyText(copyAllText(), els.copyAll);
  });

  els.clearHistory.addEventListener('click', function () {
    if (!state.history.length) return;
    if (!confirm('Clear prompt history? Starred favorites stay.')) return;
    state.history = [];
    saveStore();
    renderHistory();
  });

  els.clearFavorites.addEventListener('click', function () {
    if (!state.favorites.length) return;
    if (!confirm('Clear starred favorites?')) return;
    state.favorites = [];
    saveStore();
    renderFavorites();
    renderResults();
  });

  els.exportText.addEventListener('click', function () {
    download('promptforge-history.txt', historyAsText(), 'text/plain');
  });

  els.exportJson.addEventListener('click', function () {
    download('promptforge-history.json', JSON.stringify({
      history: state.history,
      favorites: state.favorites,
    }, null, 2), 'application/json');
  });

  els.results.addEventListener('mousedown', function (event) {
    if (event.target.closest('[data-weight], [data-step]')) event.preventDefault();
  });

  els.results.addEventListener('click', function (event) {
    const copyBtn = event.target.closest('[data-copy]');
    if (copyBtn) {
      const index = Number(copyBtn.getAttribute('data-copy'));
      const kind = copyBtn.getAttribute('data-kind');
      const text = kind === 'negative' ? state.negative : state.results[index].positive;
      copyText(text, copyBtn);
      return;
    }
    const weightBtn = event.target.closest('[data-weight]');
    if (weightBtn) {
      applyWeight(Number(weightBtn.getAttribute('data-index')), weightBtn.getAttribute('data-weight'));
      return;
    }
    const stepBtn = event.target.closest('[data-step]');
    if (stepBtn) {
      applyWeight(Number(stepBtn.getAttribute('data-index')), stepBtn.getAttribute('data-step'));
      return;
    }
    const starBtn = event.target.closest('[data-star]');
    if (starBtn) toggleStar(Number(starBtn.getAttribute('data-star')));
  });

  els.favorites.addEventListener('click', onLibraryClick);
  els.history.addEventListener('click', onLibraryClick);

  function onLibraryClick(event) {
    const copyBtn = event.target.closest('[data-copy-id]');
    if (copyBtn) {
      const text = findStoredText(copyBtn.getAttribute('data-copy-id'), copyBtn.getAttribute('data-which'));
      if (text) copyText(text, copyBtn);
      return;
    }
    const loadBtn = event.target.closest('[data-load]');
    if (loadBtn) {
      loadBatch(loadBtn.getAttribute('data-load'));
      return;
    }
    const unstarBtn = event.target.closest('[data-unstar]');
    if (unstarBtn) {
      state.favorites = state.favorites.filter(function (item) {
        return item.id !== unstarBtn.getAttribute('data-unstar');
      });
      saveStore();
      renderFavorites();
      renderResults();
    }
  }

  function generate() {
    const model = currentModel();
    const output = engine.generate({
      input: els.input.value,
      model: model,
      formatOverride: state.formatOverride,
      correctSpelling: state.correctSpelling,
      improvePrompt: state.improvePrompt,
      addQuality: state.addQuality,
      ultraDetailed: state.ultraDetailed,
      includeNegative: state.includeNegative,
    });
    if (output.error) {
      els.error.hidden = false;
      els.error.textContent = output.error;
      return;
    }
    els.error.hidden = true;
    const batchId = uid();
    state.activeHistoryId = batchId;
    state.mode = output.mode;
    state.formatUsed = output.format;
    state.notes = output.notes || [];
    state.settingsLine = output.settingsLine;
    state.negative = output.negative;
    state.results = output.prompts.map(function (prompt, index) {
      return {
        id: uid(),
        positive: prompt,
        estimate: output.estimates[index],
      };
    });
    state.history.unshift({
      id: batchId,
      at: new Date().toISOString(),
      modelId: model.id,
      modelName: model.displayName,
      input: els.input.value.trim(),
      format: output.format,
      notes: state.notes,
      addQuality: state.addQuality,
      ultraDetailed: state.ultraDetailed,
      includeNegative: state.includeNegative,
      formatOverride: state.formatOverride,
      settingsLine: output.settingsLine,
      negative: output.negative,
      prompts: state.results.map(function (result) {
        return { id: result.id, positive: result.positive };
      }),
    });
    state.history = state.history.slice(0, 100);
    saveStore();
    renderResults();
    renderHistory();
    els.results.scrollTop = 0;
  }

  function renderResults() {
    const model = currentModel();
    if (!state.results.length) {
      els.results.innerHTML = '';
      els.copyAll.hidden = true;
      els.resultsMeta.textContent = 'Type a word like eyes, or paste a prompt.';
      showNotes([]);
      return;
    }
    const formatName = FORMAT_LABEL[state.formatUsed] || state.formatUsed;
    const modeName = state.mode === 'short' ? 'Variations' : (state.improvePrompt ? 'Improved suggestions' : 'Optimized');
    els.resultsMeta.textContent = modeName + ' · ' + formatName + ' · ' + (model ? model.shortLabel : '');
    showNotes(state.notes);
    els.copyAll.hidden = false;
    els.results.innerHTML = state.results.map(function (result, index) {
      const label = resultLabel(index);
      const starred = state.favorites.some(function (item) { return item.id === result.id; });
      const estimateClass = result.estimate && result.estimate.warn ? 'estimate warn' : 'estimate';
      const negative = state.negative
        ? '<div class="neg-block"><div class="neg-top"><span class="card-label">Negative</span><button type="button" class="copy-btn" data-copy="' + index + '" data-kind="negative">Copy</button></div><pre class="prompt-text">' + escapeHtml(state.negative) + '</pre></div>'
        : '';
      return '<article class="card">' +
        '<div class="card-top"><span class="card-label">' + label + '</span><button type="button" class="copy-btn" data-copy="' + index + '" data-kind="positive">Copy</button></div>' +
        '<pre class="prompt-text" data-prompt="' + index + '">' + escapeHtml(result.positive) + '</pre>' +
        '<div class="weight-row"><span>Weight</span>' +
        weightButton(index, '0.8') + weightButton(index, '0.9') + weightButton(index, '1.1') + weightButton(index, '1.2') + weightButton(index, '1.3') +
        '<button type="button" data-step="-1" data-index="' + index + '">−</button>' +
        '<button type="button" data-step="1" data-index="' + index + '">+</button>' +
        '<span class="weight-hint" id="weight-hint-' + index + '"></span></div>' +
        '<p class="settings">' + escapeHtml(state.settingsLine) + '</p>' +
        '<p class="' + estimateClass + '">' + escapeHtml(result.estimate ? result.estimate.label : '') + '</p>' +
        negative +
        '<div class="card-actions"><button type="button" class="star' + (starred ? ' starred' : '') + '" data-star="' + index + '">' + (starred ? 'Starred' : 'Star') + '</button></div>' +
        '</article>';
    }).join('');
  }

  function resultLabel(index) {
    if (state.mode === 'short') return 'Variation ' + (index + 1);
    if (!state.improvePrompt) return index === 0 ? 'Optimized' : 'Alternate ' + index;
    return index === 0 ? 'Improved' : 'Suggestion ' + (index + 1);
  }

  function weightButton(index, value) {
    return '<button type="button" data-weight="' + value + '" data-index="' + index + '">' + value + '</button>';
  }

  function applyWeight(index, command) {
    const el = document.querySelector('[data-prompt="' + index + '"]');
    const hint = document.getElementById('weight-hint-' + index);
    const offsets = selectionOffsets(el);
    if (!offsets || !offsets.text.trim()) {
      if (hint) hint.textContent = 'Select text in the prompt first.';
      return;
    }
    const chosen = offsets.text;
    const wrapped = command === '1' || command === '-1'
      ? stepWeight(chosen, Number(command))
      : wrapWeight(chosen, command);
    const next = el.textContent.slice(0, offsets.start) + wrapped + el.textContent.slice(offsets.end);
    el.textContent = next;
    state.results[index].positive = next;
    syncHistoryPrompt(state.results[index].id, next);
    syncFavorite(state.results[index].id, next);
    if (hint) hint.textContent = '';
    selectRange(el, offsets.start, offsets.start + wrapped.length);
  }

  function wrapWeight(text, weight) {
    const match = text.match(/^\((.*):([0-9.]+)\)$/);
    const inner = (match ? match[1] : text).trim();
    const value = Number(weight).toFixed(1);
    return '(' + inner + ':' + value + ')';
  }

  function stepWeight(text, direction) {
    const match = text.match(/^\((.*):([0-9.]+)\)$/);
    const current = match ? parseFloat(match[2]) : 1;
    let next = Math.round((current + direction * 0.1) * 10) / 10;
    next = Math.min(2, Math.max(0.1, next));
    return wrapWeight(match ? match[1] : text, next);
  }

  function selectionOffsets(el) {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || selection.isCollapsed) return null;
    const range = selection.getRangeAt(0);
    if (!el.contains(range.startContainer) || !el.contains(range.endContainer)) return null;
    const before = range.cloneRange();
    before.selectNodeContents(el);
    before.setEnd(range.startContainer, range.startOffset);
    const start = before.toString().length;
    const text = range.toString();
    return { start: start, end: start + text.length, text: text };
  }

  function selectRange(el, start, end) {
    const node = el.firstChild;
    if (!node) return;
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function toggleStar(index) {
    const result = state.results[index];
    const existing = state.favorites.findIndex(function (item) { return item.id === result.id; });
    if (existing >= 0) {
      state.favorites.splice(existing, 1);
    } else {
      const model = currentModel();
      state.favorites.unshift({
        id: result.id,
        at: new Date().toISOString(),
        modelName: model ? model.displayName : '',
        input: els.input.value.trim(),
        positive: result.positive,
        negative: state.negative,
        settingsLine: state.settingsLine,
      });
    }
    saveStore();
    renderFavorites();
    renderResults();
  }

  function renderFavorites() {
    if (!state.favorites.length) {
      els.favorites.innerHTML = '<p class="empty">Star a result to pin it here.</p>';
      return;
    }
    els.favorites.innerHTML = state.favorites.map(function (item) {
      return '<article class="history-card"><div class="row"><strong>' + escapeHtml(item.modelName) + '</strong><span>' + escapeHtml(formatTime(item.at)) + '</span></div><p>' + escapeHtml(clip(item.positive, 120)) + '</p><div class="row" style="margin-top:8px"><button type="button" class="load-btn" data-copy-id="' + item.id + '" data-which="favorite">Copy</button><button type="button" class="load-btn" data-unstar="' + item.id + '">Unstar</button></div></article>';
    }).join('');
  }

  function renderHistory() {
    if (!state.history.length) {
      els.history.innerHTML = '<p class="empty">Generations land here.</p>';
      return;
    }
    els.history.innerHTML = state.history.map(function (batch) {
      const count = batch.prompts.length;
      return '<article class="history-card"><div class="row"><strong>' + escapeHtml(batch.modelName) + '</strong><span>' + escapeHtml(formatTime(batch.at)) + '</span></div><p>' + escapeHtml(clip(batch.input, 80)) + ' · ' + count + ' prompt' + (count === 1 ? '' : 's') + '</p><div class="row" style="margin-top:8px"><button type="button" class="load-btn" data-load="' + batch.id + '">Load</button><button type="button" class="load-btn" data-copy-id="' + batch.id + '" data-which="batch">Copy</button></div></article>';
    }).join('');
  }

  function loadBatch(id) {
    const batch = state.history.find(function (item) { return item.id === id; });
    if (!batch) return;
    els.input.value = batch.input;
    renderSpellcheck();
    state.modelId = batch.modelId;
    state.formatOverride = batch.formatOverride || 'auto';
    state.addQuality = batch.addQuality;
    state.ultraDetailed = Boolean(batch.ultraDetailed);
    state.includeNegative = batch.includeNegative;
    state.notes = batch.notes || [];
    els.format.value = state.formatOverride;
    els.quality.checked = state.addQuality;
    els.ultra.checked = state.ultraDetailed;
    els.negative.checked = state.includeNegative;
    state.activeHistoryId = batch.id;
    state.mode = batch.input.includes(',') ? 'optimize' : 'short';
    state.formatUsed = batch.format;
    state.settingsLine = batch.settingsLine;
    state.negative = batch.negative || '';
    state.results = batch.prompts.map(function (prompt) {
      return {
        id: prompt.id,
        positive: prompt.positive,
        estimate: { label: '', warn: false },
      };
    });
    renderModelButton();
    renderFormatHint();
    renderResults();
    saveStore();
  }

  function findStoredText(id, which) {
    if (which === 'favorite') {
      const item = state.favorites.find(function (favorite) { return favorite.id === id; });
      return item ? item.positive : '';
    }
    const batch = state.history.find(function (item) { return item.id === id; });
    if (!batch) return '';
    const lines = batch.prompts.map(function (prompt, index) {
      return (index + 1) + '. ' + prompt.positive;
    });
    if (batch.negative) lines.push('', 'Negative:', batch.negative);
    return lines.join('\n');
  }

  function copyAllText() {
    const lines = state.results.map(function (result, index) {
      return (index + 1) + '. ' + result.positive;
    });
    if (state.negative) lines.push('', 'Negative:', state.negative);
    return lines.join('\n');
  }

  function syncHistoryPrompt(id, text) {
    state.history.forEach(function (batch) {
      batch.prompts.forEach(function (prompt) {
        if (prompt.id === id) prompt.positive = text;
      });
    });
    saveStore();
  }

  function syncFavorite(id, text) {
    const favorite = state.favorites.find(function (item) { return item.id === id; });
    if (!favorite) return;
    favorite.positive = text;
    saveStore();
    renderFavorites();
  }

  function currentModel() {
    return models.find(function (model) { return model.id === state.modelId; }) || models[0];
  }

  function renderModelButton() {
    const model = currentModel();
    els.modelButtonLabel.textContent = model ? model.shortLabel : 'Pick a model';
  }

  function renderFormatHint() {
    const model = currentModel();
    if (!model) {
      els.formatHint.textContent = '';
      return;
    }
    if (state.formatOverride === 'auto') {
      els.formatHint.textContent = 'Using ' + FORMAT_LABEL[model.preferredFormat] + ' for ' + model.displayName + '.';
    } else {
      els.formatHint.textContent = 'Override: ' + FORMAT_LABEL[state.formatOverride] + '.';
    }
  }

  function openModels() {
    state.open = true;
    state.query = '';
    state.highlight = Math.max(0, filteredModels().findIndex(function (model) { return model.id === state.modelId; }));
    els.modelPanel.hidden = false;
    els.modelButton.setAttribute('aria-expanded', 'true');
    els.modelSearch.value = '';
    renderModelList();
    els.modelSearch.focus();
  }

  function closeModels() {
    state.open = false;
    els.modelPanel.hidden = true;
    els.modelButton.setAttribute('aria-expanded', 'false');
  }

  function selectModel(id) {
    const previous = state.modelId;
    state.modelId = id;
    const model = currentModel();
    if (previous !== id && model) state.includeNegative = Boolean(model.negativeDefault);
    els.negative.checked = state.includeNegative;
    renderModelButton();
    renderFormatHint();
    closeModels();
    saveStore();
  }

  function filteredModels() {
    const query = state.query.trim().toLowerCase();
    return models.filter(function (model) {
      if (!query) return true;
      return (model.displayName + ' ' + model.shortLabel + ' ' + model.category + ' ' + model.id).toLowerCase().includes(query);
    });
  }

  function renderModelList() {
    const flat = filteredModels();
    if (!flat.length) {
      els.modelList.innerHTML = '<p class="empty">No model matches.</p>';
      return;
    }
    let html = '';
    let lastGroup = '';
    flat.forEach(function (model, index) {
      if (model.category !== lastGroup) {
        lastGroup = model.category;
        html += '<div class="group-label">' + (model.category === 'video' ? 'Video' : 'Image') + '</div>';
      }
      const classes = ['option'];
      if (index === state.highlight) classes.push('active');
      if (model.id === state.modelId) classes.push('selected');
      html += '<button type="button" class="' + classes.join(' ') + '" data-id="' + model.id + '" role="option">' + escapeHtml(model.shortLabel) + '</button>';
    });
    els.modelList.innerHTML = html;
    els.modelList.querySelectorAll('.option').forEach(function (button) {
      button.addEventListener('click', function () {
        selectModel(button.getAttribute('data-id'));
      });
    });
    const active = els.modelList.querySelector('.option.active');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  function copyText(text, button) {
    const done = function () { flash(button); };
    if (window.promptforge && window.promptforge.copyText) {
      window.promptforge.copyText(text);
      done();
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallbackCopy(text);
        done();
      });
      return;
    }
    fallbackCopy(text);
    done();
  }

  function fallbackCopy(text) {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }

  function flash(button) {
    if (!button) return;
    const previous = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    setTimeout(function () {
      button.textContent = previous;
      button.classList.remove('copied');
    }, 1400);
  }

  function historyAsText() {
    const lines = [];
    state.favorites.forEach(function (item) {
      lines.push('# Favorite · ' + item.modelName + ' · ' + item.at);
      lines.push(item.positive);
      if (item.negative) lines.push('Negative: ' + item.negative);
      lines.push('');
    });
    state.history.forEach(function (batch) {
      lines.push('# ' + batch.modelName + ' · ' + batch.input + ' · ' + batch.at);
      batch.prompts.forEach(function (prompt, index) {
        lines.push((index + 1) + '. ' + prompt.positive);
      });
      if (batch.negative) lines.push('Negative: ' + batch.negative);
      lines.push('');
    });
    return lines.join('\n');
  }

  function download(name, content, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
  }

  function saveStore() {
    const payload = {
      modelId: state.modelId,
      formatOverride: state.formatOverride,
      correctSpelling: state.correctSpelling,
      improvePrompt: state.improvePrompt,
      addQuality: state.addQuality,
      ultraDetailed: state.ultraDetailed,
      includeNegative: state.includeNegative,
      history: state.history,
      favorites: state.favorites,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  function showNotes(notes) {
    if (!notes || !notes.length) {
      els.notes.hidden = true;
      els.notes.textContent = '';
      return;
    }
    els.notes.hidden = false;
    els.notes.textContent = notes.join(' · ');
  }

  function formatTime(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }

  function clip(text, max) {
    const value = String(text || '').replace(/\s+/g, ' ').trim();
    if (value.length <= max) return value;
    return value.slice(0, max - 1) + '…';
  }

  function renderSpellcheck() {
    const text = els.input.value;
    if (!state.correctSpelling || !window.PF_SPELLING) {
      els.spellLayer.innerHTML = '';
      els.spellHint.textContent = '';
      return;
    }
    const parts = [];
    const notes = [];
    const seen = {};
    const re = /[A-Za-z]+/g;
    let last = 0;
    let match;
    while ((match = re.exec(text))) {
      const word = match[0];
      const fixed = window.PF_SPELLING.correctText(word).text;
      parts.push(escapeHtml(text.slice(last, match.index)));
      if (fixed !== word) {
        parts.push('<span class="miss">' + escapeHtml(word) + '</span>');
        const note = word + ' → ' + fixed;
        if (!seen[note]) {
          seen[note] = true;
          notes.push(note);
        }
      } else {
        parts.push(escapeHtml(word));
      }
      last = match.index + word.length;
    }
    parts.push(escapeHtml(text.slice(last)));
    let html = parts.join('');
    if (text.endsWith('\n')) html += '<br>';
    els.spellLayer.innerHTML = html;
    els.spellLayer.scrollTop = els.input.scrollTop;
    els.spellHint.textContent = notes.length ? 'Spellcheck: ' + notes.join(' · ') : '';
  }

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }
})();
