import log from 'electron-log';
import path from 'path';
import './server';

const [watch] = process.argv.slice(-1);
if (watch === '-watch') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });
}

