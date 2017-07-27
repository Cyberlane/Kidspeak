import log from 'electron-log';
import { init, redirect } from './electron-app';
import webServer from './web-server';
import './electron-prompt';

Promise.all([webServer, init])
  .then(([port]) => {
    redirect(`http://localhost:${port}`);
  })
  .catch((e) => {
    log.error(e);
  });
