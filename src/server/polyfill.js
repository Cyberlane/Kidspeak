/* eslint no-undef: 0 */
const { ipcRenderer } = require('electron');

window.prompt = (title, value) =>
  ipcRenderer.sendSync('prompt', { title, value });
