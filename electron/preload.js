const { contextBridge, clipboard } = require('electron');

contextBridge.exposeInMainWorld('promptforge', {
  version: '0.1.0',
  copyText(text) {
    clipboard.writeText(String(text ?? ''));
    return true;
  },
});
