import fs from 'fs';
import mkdirp from 'mkdirp';

/**
 * Native async / await for reading file in node
 * @param {String} path - fs.readFile path
 * @param {String} opts - fs.readFile options
 */
export function readFileAsync(path, opts = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

/**
 * Native async / await for writing file in node
 * @param {String} path - fs.readFile path
 * @param {String} data - file content
 * @param {String} opts - fs.readFile options
 */
export function writeFileAsync(path, data, opts = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

/**
 * Native async / await for reading directorys in node
 * @param {String} path - fs.readFile path
 */
export function readDirAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, filenames) => {
      if (err) {
        return reject(err);
      }

      return resolve(filenames);
    });
  });
}

/**
 * Native async / await for checking if file exists in node
 * @param {String} path - fs.readFile path
 */
export function existsSyncAsync(path) {
  return new Promise((resolve, reject) => {
    const exists = fs.existsSync(path);

    if (exists) {
      return resolve(true);
    }

    return reject(new Error(false));
  });
}

/**
 * Native async / await for creating directorys in node
 * @param {String} dir - directorys path
 */
export function createDirectorys(dir) {
  return new Promise((resolve, reject) => {
    try {
      return fs.exists(dir, async (exists) => {
        if (!exists) {
          await mkdirp(dir);
        }

        return resolve(dir);
      });
    } catch (error) {
      return reject(error);
    }
  });
}
