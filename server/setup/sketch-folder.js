import log from 'electron-log';
import path from 'path';
import { safeExists } from './exists';

const getSketchPath = home =>
  path.join(home, 'Documents', 'Arduino');

const takeLibraryFolder = sketchPath =>
  new Promise((resolve, reject) => {
    const lower = safeExists(path.join(sketchPath, 'libraries'));
    const upper = safeExists(path.join(sketchPath, 'Libraries'));
    Promise.all([lower, upper])
      .then(paths => paths.filter(Boolean))
      .then(([libraryPath]) =>
        (libraryPath !== null ? resolve(libraryPath) : reject()),
      )
      .catch((err) => {
        log.error(err);
        reject();
      });
  });

export {
  getSketchPath,
  takeLibraryFolder,
};
