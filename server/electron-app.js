/* eslint no-param-reassign: 0 */
import { app, BrowserWindow, ipcMain } from 'electron';
import log from 'electron-log';
import path from 'path';

log.info('App started');
let mainWindow = null;

const init = () =>
  new Promise((resolve) => {
    app.on('window-all-closed', () => {
      log.info('App closing');
      app.quit();
    });

    app.on('ready', () => {
      log.info('Creating blank browser window');
      mainWindow = new BrowserWindow({
        show: false,
        webPreferences: {
          preload: path.join(__dirname, '/polyfill.js'),
        },
      });
      mainWindow.loadURL(`file://${__dirname}/../views/loading.html`);
      mainWindow.maximize();
      mainWindow.show();
      if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
      }
      resolve();
    });
  });

const redirect = (url) => {
  mainWindow.loadURL(url);
};

let promptResponse = null;
ipcMain.on('prompt', (eventRet, args) => {
  promptResponse = null;
  const promptWindow = new BrowserWindow({
    width: 200,
    height: 100,
    show: false,
    resizable: false,
    movable: false,
    alwaysOnTop: true,
    frame: false,
  });
  const value = args.value || '';
  const html = `
    <label for="val">${args.title}</label>
    <input id="val" value="${value}" autofocus />
    <button onClick="require('electron').ipcRenderer.send('prompt-response', document.getElementById('val').value);window.close()">Ok</button>
    <button onClick="window.close()">Cancel</button>
    <style>body{font-family: sans-serif;} button{float:right;margin-left:10px;} label,input{margin-bottom:10px;width:100%;display:block;}</style>
  `;
  promptWindow.loadURL(`data:text/html,${html}`);
  promptWindow.show();
  promptWindow.on('closed', () => {
    eventRet.returnValue = promptResponse;
  });
});

ipcMain.on('prompt-response', (event, args) => {
  promptResponse = args === '' ? null : args;
});

export {
  init,
  redirect,
};
