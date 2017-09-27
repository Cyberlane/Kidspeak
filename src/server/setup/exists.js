import log from 'electron-log';
import fs from 'fs';

const exists = (filepath, reason) =>
  new Promise((resolve, reject) => {
    fs.access(filepath, fs.constants.F_OK, (err) => {
      if (err) {
        log.debug(`Does not exist: ${filepath}`);
        reject(reason);
      } else {
        log.debug(`Does exist: ${filepath}`);
        resolve(filepath);
      }
    });
  });

const safeExists = filepath =>
  exists(filepath).catch(() => null);

export {
  exists,
  safeExists,
};
