const { app, shell, BrowserWindow } = require('electron');
const log = require('electron-log');
const notification = require('electron-notifications');

log.info('App starting...');

let win;

const sendStatusToWindow = (text) => {
  log.info(text);
};

const ready = (createWindow, loadWindow, loaded) => {
  app.on('ready', () => {
    createWindow();
    loaded.window = true;
    if (loaded.server) {
      loadWindow();
    }
  });
};

const closed = (setup) => {
  app.on('closed', () => {
    setup.win = null;
  });
};

const windowAllClosed = () => {
  app.on('window-all-closed', () => {
    log.info('App closing...')
    app.quit();
  });
};

const activate = (setup) => {
  app.on('activate', () => {
    if (setup.win === null) {
      createWindow();
    }
  });
};

const configureApp = (setup, loaded) => {
  const loadWindow = () => setup.win.loadURL(`http://localhost:${setup.port}#v${app.getVersion()}`);

  const createWindow = () => {
    setup.win = new BrowserWindow({ width: 800, height: 600 });
    setup.win.maximize();
    win = setup.win;
  };

  ready(createWindow, loadWindow, loaded);
  closed(setup);
  windowAllClosed();
  activate(setup);
};

exports.configureApp = configureApp;
