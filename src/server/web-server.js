import log from 'electron-log';
import portFinder from 'portfinder';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import uploadToArduino from './arduino';

log.info('Creating server instance');
const server = express();
server.use(bodyParser.text());

log.info('Registering server static content paths');
server.use('/media', express.static(path.join(__dirname, '../media')));
server.use('/css', express.static(path.join(__dirname, '../css')));
server.use('/js', express.static(path.join(__dirname, '../js')));
server.use('/assets', express.static(path.join(__dirname, '../assets')));

log.info('Enabling CORS');
server.head('/', (req, res) => {
  res.status(200);
  res.set('content-type', 'text/html;charset=utf-8');
  res.set('Access-Control-Allow-Origin', '*');
  res.end();
});

log.info('Registering entry point');
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

log.info('Registering upload point');
server.post('/', (req, res) => {
  log.info('Upload attempt');
  if (parseInt(req.get('Content-Length'), 10) === 0) {
    log.warn('Upload content length was zero');
    res.status(400);
    res.end();
    return;
  }

  const sketchName = path.join(__dirname, '../upload/upload.ino');
  log.info('Writing content to sketch file');
  log.info(sketchName);
  fs.writeFile(sketchName, req.body, 'utf-8', () => {
    log.info('Finished writing to sketch file');
    uploadToArduino(sketchName)
      .then(() => {
        res.status(200);
        res.set('Access-Control-Allow-Origin', '*');
        res.end();
      })
      .catch((error) => {
        log.error(error);
        res.status(500);
        res.end();
      });
  });
});

log.info('Attempting to find an un-used port');
const portPromise = portFinder.getPortPromise()
  .then((port) => {
    log.info(`Port ${port} was found`);
    server.listen(port, () => {
      log.info('Server is listening for requests');
    });
    return port;
  })
  .catch(() => {
    log.error('failed to find a port');
    // an error happened trying to get a port...
    // we need some type of re-try mechanism here, with a fail on 5th attempt
  });

export default portPromise;
