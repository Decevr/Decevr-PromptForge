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
    document.getElementById('prompt-input').value = 'eyes';
    document.getElementById('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const text = document.querySelector('[data-prompt="0"]')?.textContent || '';
    const copyButtons = document.querySelectorAll('.copy-btn').length;
    const label = document.getElementById('model-button-label').textContent;
    const settings = document.querySelector('.settings')?.textContent || '';
    JSON.stringify({ text, copyButtons, label, settings, cards: document.querySelectorAll('.card').length });
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
  if (problems.length) {
    console.error(problems.join('\n'));
    app.exit(1);
    return;
  }
  console.log('ui smoke passed');
  console.log(parsed.text);
  app.exit(0);
});
