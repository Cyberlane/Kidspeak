import { init, redirect } from './electron-app';
import webServer from './web-server';

init()
  .then(() => {
    webServer
      .then((port) => {
        redirect(`http://localhost:${port}`);
      });
  });
