'use strict';

const fs = require('fs');
const path = require('path');
const Registry = require('winreg');
const SerialPort = require('serialport');

let arduinoCommand = null;

const getArduinoCommand = () => {
  if (arduinoCommand !== null) {
    return `"${arduinoCommand}"`;
  }

  let arduinoCommandGuesses = [];
  if (process.platform === 'darwin') {
    arduinoCommandGuesses.push('/Applications/Arduino.app/Contents/MacOS/Arduino');
  }
  else if (process.platform === 'linux') {
    arduinoCommandGuesses.push('/usr/bin/arduino');
  }
  else if (/^win/.test(process.platform)) {
    const programFiles = process.env['ProgramFiles'];
    const programFiles86 = process.env['ProgramFiles(x86)'];
    arduinoCommandGuesses.push(
      path.join(programFiles, 'Arduino', 'Arduino.exe'),
      path.join(programFiles, 'Arduino', 'Arduino_debug.exe'),
      path.join(programFiles86, 'Arduino', 'Arduino.exe'),
      path.join(programFiles86, 'Arduino', 'Arduino_debug.exe')
    );
  }

  arduinoCommandGuesses
    .filter(guess => fs.existsSync(guess))
    .forEach(guess => {
      console.log(`Found Arduino command at ${guess}`);
      arduinoCommand = guess;
    });

  if (arduinoCommand !== null) {
    return `"${arduinoCommand}"`;
  }

  console.log('Could not find Arduino command; hoping it is on the path!');
  arduinoCommand = "arduino";
  return arduinoCommand;
};

const guessPortName = (res) => {
  SerialPort.list((err, ports) => {
    if (err) {
      res(err);
      return;
    }

    let nixFound = ports
      .filter(p => p.comName.indexOf('luetooth') === -1)
      .map(p => p.comName)
      .reverse();

    if (nixFound.length > 0) {
      console.info(`${nixFound.length} ports found`);
      res(false, nixFound[0]);
      return;
    }

    res('No Serial Ports found for Arduino');
  });
};

module.exports = {
  getArduinoCommand,
  guessPortName
};
