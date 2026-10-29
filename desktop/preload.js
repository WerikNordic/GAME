const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('launcher', {
  state: () => ipcRenderer.invoke('state'),
  check: () => ipcRenderer.invoke('check'),
  update: () => ipcRenderer.invoke('update'),
  play: () => ipcRenderer.invoke('play'),
  repair: () => ipcRenderer.invoke('update', true),
  setAuto: (v) => ipcRenderer.invoke('setAuto', v),
  openLink: (u) => ipcRenderer.invoke('openLink', u),
  onProgress: (cb) => ipcRenderer.on('progress', (_, p) => cb(p))
});
