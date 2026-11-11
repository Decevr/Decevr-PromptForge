const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '..', 'electron', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });
  const errors = [];
  win.webContents.on('console-message', (_event, _level, message) => {
    if (/error|uncaught/i.test(message)) errors.push(message);
  });
  win.webContents.on('did-fail-load', (_event, code, description) => {
    errors.push(code + ' ' + description);
  });
  await win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  const report = await win.webContents.executeJavaScript(`
    document.getElementById('prompt-input').value = 'beuatiful womna post';
    document.getElementById('prompt-input').dispatchEvent(new Event('input', { bubbles: true }));
    const spellMisses = document.querySelectorAll('.spell-layer .miss').length;
    const spellHint = document.getElementById('spell-hint').textContent;
    document.getElementById('prompt-input').value = 'eyes';
    document.getElementById('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const text = document.querySelector('[data-prompt="0"]')?.textContent || '';
    const copyButtons = document.querySelectorAll('.copy-btn').length;
    const label = document.getElementById('model-button-label').textContent;
    const settings = document.querySelector('.settings')?.textContent || '';
    const title = document.querySelector('h1')?.textContent || '';
    const credit = document.querySelector('.credit')?.textContent || '';
    document.getElementById('characters-open').click();
    const charOpen = document.getElementById('character-modal').hidden === false;
    const charFields = ['nipples', 'hips', 'thighs', 'freckles', 'piercings', 'tattoos'].every((name) => {
      return !!document.querySelector('#character-form [name="' + name + '"]');
    });
    const marksHeading = [...document.querySelectorAll('#character-form .field-section')].some((node) => node.textContent === 'Marks, piercings, and tattoos');
    document.getElementById('char-close').click();
    const charClosed = document.getElementById('character-modal').hidden === true;
    document.getElementById('negatives-open').click();
    document.querySelector('#neg-categories [data-cat="extra"]').checked = true;
    document.getElementById('neg-apply').click();
    document.getElementById('prompt-input').value = 'eyes';
    document.getElementById('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const negative = document.querySelector('.neg-block')?.textContent || '';
    const tools = ['Characters', 'Camera', 'Negatives', 'More variations'].filter((name) => {
      return [...document.querySelectorAll('.tool-bar button')].some((button) => button.textContent === name);
    });
    const selectedText = document.getElementById('selected-character-list')?.textContent || '';
    const angleCount = document.querySelectorAll('#angle-list button').length;
    const lensCount = document.querySelectorAll('#lens-list button').length;
    const stealthCount = document.querySelectorAll('#stealth-list button').length;
    const stealthLabel = [...document.querySelectorAll('#stealth-list button')].some((button) => button.textContent === 'Stealth masturbation');
    const hintMoved = !document.querySelector('.toggles #format-hint') && !!document.querySelector('.status-bar #format-hint');
    const extraCount = document.querySelectorAll('#extra-bar select').length;
    document.getElementById('extra-hair').value = 'long wavy hair';
    const hairAdded = window.PromptForgeExtras.apply(['close-up'], 'eyes', 'danbooru').prompts[0];
    const hairSkipped = window.PromptForgeExtras.apply(['close-up'], 'blonde hair', 'danbooru').prompts[0];
    document.getElementById('extra-hair').value = '';
    JSON.stringify({ text, copyButtons, label, settings, cards: document.querySelectorAll('.card').length, title, credit, spellMisses, spellHint, charOpen, charClosed, charFields, marksHeading, negative, tools, selectedText, angleCount, lensCount, stealthCount, stealthLabel, hintMoved, extraCount, hairAdded, hairSkipped });
  `);
  const parsed = JSON.parse(report);
  const problems = [];
  if (errors.length) problems.push('console: ' + errors.join(' | '));
  if (!parsed.text.includes('sparkling_eyes')) problems.push('missing danbooru prompt: ' + parsed.text);
  if (!parsed.text.startsWith('masterpiece')) problems.push('missing quality tags');
  if (parsed.copyButtons < 2) problems.push('copy buttons missing');
  if (parsed.label !== 'Illustrious – tags') problems.push('model label: ' + parsed.label);
  if (!parsed.settings.includes('CFG')) problems.push('settings missing');
  if (parsed.cards < 5) problems.push('expected variations, got ' + parsed.cards);
  if (parsed.title !== 'PromptForge') problems.push('wordmark: ' + parsed.title);
  if (parsed.credit !== 'Decevr Co.') problems.push('credit: ' + parsed.credit);
  if (parsed.spellMisses !== 2) problems.push('spellcheck marks: ' + parsed.spellMisses);
  if (!/beuatiful → beautiful/.test(parsed.spellHint)) problems.push('spellcheck hint: ' + parsed.spellHint);
  if (!/womna → woman/.test(parsed.spellHint)) problems.push('spellcheck hint: ' + parsed.spellHint);
  if (/post/.test(parsed.spellHint)) problems.push('spellcheck flagged post: ' + parsed.spellHint);
  if (!parsed.charOpen || !parsed.charClosed) problems.push('character modal did not open and close');
  if (!parsed.charFields) problems.push('character body and mark fields missing');
  if (!parsed.marksHeading) problems.push('marks section missing');
  if (!/extra people/.test(parsed.negative)) problems.push('custom negative missing: ' + parsed.negative);
  if (parsed.tools.length !== 4) problems.push('tool buttons: ' + parsed.tools.join(', '));
  if (parsed.selectedText !== 'No characters selected') problems.push('selected characters: ' + parsed.selectedText);
  if (parsed.angleCount < 30) problems.push('angle count: ' + parsed.angleCount);
  if (parsed.lensCount < 25) problems.push('lens count: ' + parsed.lensCount);
  if (parsed.stealthCount < 12) problems.push('stealth count: ' + parsed.stealthCount);
  if (!parsed.stealthLabel) problems.push('stealth masturbation button missing');
  if (parsed.extraCount < 9) problems.push('variation menus: ' + parsed.extraCount);
  if (!/long_wavy_hair/.test(parsed.hairAdded)) problems.push('hairstyle was not added: ' + parsed.hairAdded);
  if (/long_wavy_hair/.test(parsed.hairSkipped)) problems.push('hairstyle replaced typed hair: ' + parsed.hairSkipped);
  if (!parsed.hintMoved) problems.push('format hint still in the toggle row');
  if (problems.length) {
    console.error(problems.join('\n'));
    app.exit(1);
    return;
  }
  console.log('ui smoke passed');
  console.log(parsed.text);
  app.exit(0);
});
