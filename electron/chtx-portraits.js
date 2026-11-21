const { protocol, net } = require('electron');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

function chtxRoot() {
  const candidates = [
    'C:\\Users\\Danie\\Projects\\CHTX\\app\\src\\main\\assets\\www',
    path.join(process.env.LOCALAPPDATA || '', 'CHTX', 'www'),
  ];
  return candidates.find((dir) => fs.existsSync(dir)) || candidates[0];
}

function registerChtxScheme() {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'chtx',
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true,
        stream: true,
        corsEnabled: true,
      },
    },
  ]);
}

function installChtxProtocol() {
  const root = path.resolve(chtxRoot());
  protocol.handle('chtx', (request) => {
    try {
      const url = new URL(request.url);
      const rel = decodeURIComponent(url.pathname).replace(/^\/+/, '').replace(/\\/g, '/');
      if (!rel.startsWith('images/') || rel.includes('..')) {
        return new Response('Not found', { status: 404 });
      }
      const full = path.resolve(root, rel);
      const inside = full === root || full.startsWith(root + path.sep);
      if (!inside || !fs.existsSync(full)) return new Response('Not found', { status: 404 });
      return net.fetch(pathToFileURL(full).href);
    } catch (error) {
      return new Response('Not found', { status: 404 });
    }
  });
}

module.exports = { registerChtxScheme, installChtxProtocol };
