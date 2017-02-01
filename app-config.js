const { app, BrowserWindow } = require('electron');

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
  const loadWindow = () => setup.win.loadURL(`http://localhost:${setup.port}`);

  const createWindow = () => {
    setup.win = new BrowserWindow({ width: 800, height: 600 });
    setup.win.maximize();
  };

  ready(createWindow, loadWindow, loaded);
  closed(setup);
  windowAllClosed();
  activate(setup);
};

exports.configureApp = configureApp;
