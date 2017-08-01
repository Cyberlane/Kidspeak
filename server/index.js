import log from 'electron-log';
import { app, dialog } from 'electron';
import { init, redirect } from './electron-app';
import webServer from './web-server';
import setup from './setup';
import './electron-prompt';

Promise.all([webServer, init, setup])
  .then(([port]) => {
    redirect(`http://localhost:${port}`);
  })
  .catch((e) => {
    log.error(e);
    dialog.showErrorBox('There was a problem', e);
    log.info('App closing due to error');
    app.quit();
  });
