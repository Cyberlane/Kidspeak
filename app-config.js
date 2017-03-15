const { app, shell, BrowserWindow } = require('electron');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
const notification = require('electron-notifications');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let win;

const sendStatusToWindow = (text) => {
  log.info(text);
};

autoUpdater
  .on('checking-for-update', () => {
    log.info('Checking for update...');
  })
  .on('update-available', (ev, info) => {
    sendStatusToWindow('Update available.');
    const note = notification.notify('Update Available!', {
      buttons: ['Ignore', 'Download'],
      url: 'https://cyberlane.github.io/Kidspeak-2016/'
    });
    note.on('buttonClicked', (text, buttonIndex, options) => {
      if (text === 'Download') {
        shell.openExternal(options.url);
      }
      notification.close()
    });
  })
  .on('error', (ev, err) => {
    log.info('Error in auto-updater.');
  });

const ready = (createWindow, loadWindow, loaded) => {
  app.on('ready', () => {
    autoUpdater.autoDownload = false;
    autoUpdater.checkForUpdates();
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
