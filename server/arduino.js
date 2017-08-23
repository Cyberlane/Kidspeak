import log from 'electron-log';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import SerialPort from 'serialport';

let command = null;

const resolveFirstValid = (paths, resolve, reject) => {
  if (paths.length === 0) {
    reject('Unable to find Arduino path');
    return;
  }
  const [currentPath, ...rest] = paths;
  fs.access(currentPath, fs.constants.F_OK, (err) => {
    if (err === null) {
      command = currentPath;
      log.info(`Arduino found: ${currentPath}`);
      resolve(currentPath);
    } else {
      resolveFirstValid(rest, resolve, reject);
    }
  });
};

const getCommand = () =>
  new Promise((resolve, reject) => {
    if (command !== null) {
      log.info('Returning known command');
      resolve(command);
      return;
    }

    log.info('First time finding command');
    if (process.platform === 'darwin') {
      resolveFirstValid([
        '/Applications/Arduino.app/Contents/MacOS/Arduino',
      ], resolve, reject);
      return;
    } else if (process.platform === 'linux') {
      resolveFirstValid([
        '/usr/bin/arduino',
      ], resolve, reject);
      return;
    } else if (/^win/.test(process.platform)) {
      const programFiles = process.env.ProgramFiles;
      const programFiles86 = process.env['ProgramFiles(x86)'];
      resolveFirstValid([
        path.join(programFiles, 'Arduino', 'Arduino_debug.exe'),
        path.join(programFiles, 'Arduino', 'Arduino.exe'),
        path.join(programFiles86, 'Arduino', 'Arduino_debug.exe'),
        path.join(programFiles86, 'Arduino', 'Arduino.exe'),
      ], resolve, reject);
      return;
    }

    reject(`Invalid platform: ${process.platform}`);
  });

const getPid = ({ productId, pnpId }) => {
  if (productId) {
    return productId;
  }
  if (pnpId) {
    try {
      return '0x' + /PID_\d*/.exec(pnpId)[0].substr(4);
    }
    catch (err) {
      return null;
    }
  }
  return null;
};

const nanoPidList = ['0x6001', '0x7523'].map(nano => parseInt(nano, 16));

const getPortName = () =>
  new Promise((resolve, reject) => {
    SerialPort.list((err, ports) => {
      if (err) {
        log.error('Unable to find SerialPort');
        reject(err);
        return;
      }
      const [port] = ports
        .filter(p => {
          const pid = getPid(p);
          if (pid === null) return false;
          nanoPidList.indexOf(parseInt(pid, 16)) !== -1;
        })
        .map(p => p.comName)
        .reverse();

      if (port) {
        log.info(`Using port: ${port}`);
        resolve(port);
        return;
      }

      reject();
    });
  });

const createUploadCommand = (arduinoPath, portName, sketchFile) =>
  `${arduinoPath} --upload --board arduino:avr:nano:cpu=atmega328 --port ${portName} ${sketchFile}`;

const uploadToArduino = sketchFile =>
  new Promise((resolve, reject) =>
    Promise.all([getCommand(), getPortName()])
    .then(([cmd, portName]) => {
      const uploadCommand = createUploadCommand(cmd, portName, sketchFile);
      exec(uploadCommand, (error) => {
        if (error) {
          log.error(error);
          reject();
        } else {
          log.info('Upload successful');
          resolve();
        }
      });
    })
    .catch((error) => {
      reject(error);
    }),
  );

export default uploadToArduino;
