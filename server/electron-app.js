import { app, BrowserWindow } from 'electron';
import log from 'electron-log';
import path from 'path';

log.info('App started');
let mainWindow = null;

const init =
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

export {
  init,
  redirect,
};
