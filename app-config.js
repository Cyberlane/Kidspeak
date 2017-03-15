const { app, BrowserWindow } = require('electron');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let win;

const sendStatusToWindow = (text) => {
  log.info(text);
  win.webContents.send('message', text);
};

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  sendStatusToWindow('Download progress...');
})
autoUpdater.on('update-downloaded', (ev, info) => {
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  setTimeout(function () {
    autoUpdater.quitAndInstall();
  }, 5000)
});

const ready = (createWindow, loadWindow, loaded) => {
  app.on('ready', () => {
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
    if (process.platform !== 'darwin') {
      app.quit();
    }
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
