const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const RAW = 'https://raw.githubusercontent.com/WerikNordic/GAME/main/public/';
const SITE = 'https://github.com/WerikNordic/GAME';
let launcher = null, gameWin = null;

const dir = () => path.join(app.getPath('userData'), 'game');
const rd = (f) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };
const bundled = () => path.join(__dirname, 'app');
const cfgFile = () => path.join(app.getPath('userData'), 'config.json');
const cfg = () => ({ auto: true, ...(rd(cfgFile()) || {}) });

function local() {
  const u = rd(path.join(dir(), 'version.json'));
  if (u && fs.existsSync(path.join(dir(), 'index.html'))) return { ...u, where: 'userData' };
  const b = rd(path.join(bundled(), 'version.json')) || { version: 0, notes: '' };
  return { ...b, where: 'bundled' };
}
const gamePath = () => local().where === 'userData' ? path.join(dir(), 'index.html') : path.join(bundled(), 'index.html');

async function get(url, asText = true) {
  const r = await fetch(url + (url.includes('?') ? '&' : '?') + 't=' + Date.now(), { cache: 'no-store' });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return asText ? r.text() : r;
}

ipcMain.handle('state', () => ({ local: local(), auto: cfg().auto, app: app.getVersion(), site: SITE }));
ipcMain.handle('setAuto', (_, v) => { fs.writeFileSync(cfgFile(), JSON.stringify({ ...cfg(), auto: !!v })); return true; });
ipcMain.handle('openLink', (_, u) => { if (/^https:\/\//.test(u)) shell.openExternal(u); });
ipcMain.handle('check', async () => {
  try {
    const remote = JSON.parse(await get(RAW + 'version.json'));
    const l = local();
    return { ok: true, remote, local: l, newer: remote.version > l.version };
  } catch (e) { return { ok: false, error: String(e.message || e), local: local() }; }
});
ipcMain.handle('update', async (_, force) => {
  try {
    const send = (p) => launcher && !launcher.isDestroyed() && launcher.webContents.send('progress', p);
    send({ step: 'versão', pct: 5 });
    const remote = JSON.parse(await get(RAW + 'version.json'));
    send({ step: 'baixando o jogo', pct: 15 });
    const r = await get(RAW + 'index.html', false);
    const total = Number(r.headers.get('content-length')) || 0;
    const chunks = []; let got = 0;
    const reader = r.body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(Buffer.from(value)); got += value.length;
      send({ step: 'baixando o jogo', pct: total ? 15 + Math.round(got / total * 75) : 50 });
    }
    const buf = Buffer.concat(chunks);
    if (buf.length < 200000 || !buf.slice(0, 400).toString().toLowerCase().includes('<!doctype html')) throw new Error('arquivo baixado inválido');
    fs.mkdirSync(dir(), { recursive: true });
    const tmp = path.join(dir(), 'index.html.tmp');
    fs.writeFileSync(tmp, buf);
    fs.renameSync(tmp, path.join(dir(), 'index.html'));
    fs.writeFileSync(path.join(dir(), 'version.json'), JSON.stringify(remote));
    send({ step: 'pronto', pct: 100 });
    return { ok: true, version: remote.version };
  } catch (e) { return { ok: false, error: String(e.message || e) }; }
});
ipcMain.handle('play', () => {
  if (gameWin && !gameWin.isDestroyed()) { gameWin.focus(); return true; }
  gameWin = new BrowserWindow({
    width: 1280, height: 800, backgroundColor: '#0b1018', title: 'Eldvar: As Crônicas do Fim',
    icon: path.join(__dirname, 'icon.png'), autoHideMenuBar: true,
    webPreferences: { backgroundThrottling: false }
  });
  gameWin.loadFile(gamePath());
  gameWin.webContents.on('before-input-event', (e, i) => { if (i.type === 'keyDown' && i.key === 'F11') gameWin.setFullScreen(!gameWin.isFullScreen()); });
  gameWin.on('closed', () => { gameWin = null; if (launcher && !launcher.isDestroyed()) launcher.show(); else app.quit(); });
  if (launcher && !launcher.isDestroyed()) launcher.hide();
  return true;
});

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  launcher = new BrowserWindow({
    width: 940, height: 600, resizable: false, backgroundColor: '#0b1018', title: 'Eldvar — Launcher',
    icon: path.join(__dirname, 'icon.png'), autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true }
  });
  launcher.loadFile(path.join(__dirname, 'launcher.html'));
  launcher.on('closed', () => { launcher = null; if (!gameWin) app.quit(); });
});
app.on('window-all-closed', () => app.quit());
