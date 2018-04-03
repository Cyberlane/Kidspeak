import log from 'electron-log';
import { getSketchPath, takeLibraryFolder } from './sketch-folder';
import oledExists from './oled';
import kidspeak from './kidspeak';

const getHomePath = () =>
  (/^win/.test(process.platform)
    ? process.env.USERPROFILE
    : process.env.HOME);

const setup = new Promise((resolve, reject) => {
  log.info('Checking for Arduino Libraries');
  const home = getHomePath();
  if (typeof home === 'undefined') {
    log.error('Could not locate home directory');
    reject();
    return;
  }

  log.info(`Located home path: ${home}`);
  const sketchPath = getSketchPath(home);
  takeLibraryFolder(sketchPath)
    .then((libraryPath) => {
      log.info(`Found library path: ${libraryPath}`);
      Promise.all([
        oledExists(libraryPath),
        kidspeak(libraryPath),
      ])
      .then(() => resolve())
      .catch(reject);
    })
    .catch((e) => {
      log.error(e);
      reject('Could not find library path');
    });
});

export default setup;
