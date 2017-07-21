const portFinder = require('portfinder');
const { app, BrowserWindow } = require('electron');
const { configureApp } = require('./app-config');
const { serverConfig } = require('./server-config');

portFinder.getPortPromise()
  .then((port) => {
    console.log(port);
    const loaded = {
      window: false,
      server: false,
    };

    const setup = {
      win: null,
      port,
    };

    configureApp(setup, loaded);
    serverConfig(setup, loaded);
  });
