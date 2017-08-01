import path from 'path';
import { exists } from './exists';

const libraryExists = libraryPath =>
  exists(path.join(libraryPath, 'OLED_I2C'), 'Please install the OLED_I2C library');

export default libraryExists;
