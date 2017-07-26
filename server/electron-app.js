import { app, BrowserWindow } from 'electron';
import log from 'electron-log';

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
      mainWindow = new BrowserWindow({ show: false });
      mainWindow.loadURL(`file://${__dirname}/../views/loading.html`);
      mainWindow.maximize();
      mainWindow.show();
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
