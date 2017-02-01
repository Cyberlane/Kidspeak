const bodyParser = require('body-parser');
const exec = require('child_process').execSync;
const express = require('express');
const path = require('path');
const fs = require('fs');
const arduino = require('./arduino');
const server = express();

const staticContent = () => {
  server.use('/media', express.static('./media'));
  server.use('/css', express.static('./css'));
  server.use('/js', express.static('./js'));
  server.use('/assets', express.static('./assets'));
};

const head = () => {
  server.head('/', (req, res) => {
    res.status(200);
    res.set('content-type', 'text/html;charset=utf-8');
    res.set('Access-Control-Allow-Origin', '*');
    res.end();
  });
};

const get = () => {
  server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
  });
};

const uploadToArduino = (text) => {
  const sketchName = path.join(__dirname + '/upload/upload.ino');
  fs.writeFileSync(sketchName, text);
  const arduinoApp = arduino.getArduinoCommand();
  let compileArgs = [
    '--upload',
    '--board',
    'arduino:avr:nano:cpu=atmega328',
    '--port',
    port,
    sketchName
  ];
  const arduinoCommand = arduinoApp + ' ' + compileArgs.join(' ');
  console.log(arduinoCommand);
  let uploadResult = exec(arduinoCommand, { stdio: [0, 1, 2] });
  console.log(uploadResult);
};

const post = () => {
  server.post('/', (req, res) => {
    if (req.get('Content-Length') == 0) {
      res.status(400);
      res.end();
      return;
    }

    arduino.guessPortName((err, port) => {
      if (err) {
        res.status(400);
        res.send(err);
        res.end();
        return;
      }

      const text = req.body;
      uploadToArduino(text);
      res.status(200);
      res.set('Access-Control-Allow-Origin', '*');
      res.end();
    });
  });
};

const serverConfig = ({ port }, loaded) => {
  server.use(bodyParser.text());
  staticContent();
  head();
  get();
  post();

  server.listen(port, () => {
    loaded.server = true;
    if (loaded.window) {
      loadWindow();
    }
  });
};

exports.serverConfig = serverConfig;