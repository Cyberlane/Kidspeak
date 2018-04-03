import log from 'electron-log';
import path from 'path';
import rimraf from 'rimraf';
import { ncp } from 'ncp';

ncp.limit = 16;

const rmDir = dir =>
  new Promise((resolve, reject) => {
    log.info(`Removing old Kidspeak Arduino Library: ${dir}`);
    rimraf(dir, (e) => {
      if (e) {
        log.error(e);
        reject();
      } else {
        resolve();
      }
    });
  });

const installLibrary = libraryPath =>
  new Promise((resolve, reject) => {
    const destination = path.join(libraryPath, 'Kidspeak');
    rmDir(destination)
      .then(() => {
        const source = path.join(__dirname, '../', '../', 'library/');
        log.info('Installing latest Kidspeak Arduino Library');
        ncp(source, libraryPath, (err) => {
          if (err) {
            log.error(err);
            reject('There was a problem installing the Kidspeak Arduino Library');
          } else {
            resolve();
          }
        });
      })
      .catch(() => reject('There was a problem upgrading the Kidspeak Arduino Library'));
  });

export default installLibrary;
