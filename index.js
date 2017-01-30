const { app, BrowserWindow } = require('electron');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').execSync;
const arduino = require('./arduino');


const server = express();
const loaded = {
  window: false,
  server: false,
};
let win;

const createWindow = () => {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.maximize();
};

const loadWindow = () => win.loadURL('http://localhost:8080');

app.on('ready', () => {
  createWindow();
  loaded.window = true;
  if (loaded.server) {
    loadWindow();
  }
});

app.on('closed', () => {
  win = null;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
})

server.use(bodyParser.text());
// server.use('/blockly', express.static('../blockly'));
server.use('/media', express.static('./media'));
server.use('/css', express.static('css'));
server.use('/js', express.static('js'));
server.use('/assets', express.static('assets'));

server.head('/', (req, res) => {
  res.status(200);
  res.set('content-type', 'text/html;charset=utf-8');
  res.set('Access-Control-Allow-Origin', '*');
  res.end();
});

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

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
    res.status(200);
    res.set('Access-Control-Allow-Origin', '*');
    res.end();
  });
});

server.listen(8080, () => {
  loaded.server = true;
  if (loaded.window) {
    loadWindow();
  }
});