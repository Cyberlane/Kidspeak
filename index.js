const { app, BrowserWindow } = require('electron');
const { configureApp } = require('./app-config');
const { serverConfig } = require('./server-config');

const loaded = {
  window: false,
  server: false,
};
const setup = {
  win: null,
  port: 8080,
};

configureApp(setup, loaded);
serverConfig(setup, loaded);