const { contextBridge, clipboard } = require('electron');

contextBridge.exposeInMainWorld('promptforge', {
  version: '0.1.0',
  copyText(text) {
    clipboard.writeText(String(text ?? ''));
    return true;
  },
  chtxPortrait(rel) {
    const clean = String(rel || '').replace(/\\/g, '/').replace(/^\/+/, '');
    if (!clean.startsWith('images/') || clean.includes('..')) return '';
    return 'chtx://portrait/' + clean.split('/').map(encodeURIComponent).join('/');
  },
});
