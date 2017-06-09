const { dialog, app } = require('electron');

const fs = require('fs');
const path = require('path');

const cbz = require('extract-zip');
const cbr = require('cbr');
const Unrar = require('node-unrar');

function openFile(cb) {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'Comic Files',
      extensions: ['cbr', 'cbz', 'pdf'],
    }],
  }, (files) => {
    if (!files) {
      const err = 'Archivo no válido';
      cb({ err });
      return;
    }
    const pathFile = files[0];
    extractFiles(pathFile)
      .then((req) => {
        cb(null, req);
      }).catch((err) => {
        cb(err);
      });
  });
}

function removeFilesByExtensions(files, tmp, ext) {
  // eslint-disable-next-line no-param-reassign
  if (typeof ext === 'string') ext = [ext];

  files.forEach((file) => {
    const fileExt = path.extname(file).toLowerCase();
    const checked = ext.find(e => e.toLowerCase() === fileExt);

    if (!checked) {
      fs.unlinkSync(path.join(tmp, file));
    }
  });
}

function extractFiles(pathFile) {
  const file = path.basename(pathFile);
  const tmpFolder = createTmpFolder(file);

  switch (path.extname(file)) {
    case '.cbz':
      return cbzExtract(pathFile, tmpFolder);
    case '.cbr':
      return cbrExtract(pathFile, tmpFolder);
    default:
      break;
  }
}

function cbzExtract(pathFile, tmpFolder) {
  return new Promise((resolve, reject) => {
    cbz(pathFile, { dir: tmpFolder }, (err) => {
      if (err) reject(err);

      resolve({ tmpFolder });
    });
  });
}

function cbrExtract(pathFile, tmpFolder) {
  if (process.platform === 'linux') {
    return cbrExtractLinux(pathFile, tmpFolder);
  }
  return new Promise((resolve, reject) => {
    cbr(pathFile, tmpFolder, (err) => {
      if (err) {
        reject(err);
      }
      resolve({ tmpFolder });
    });
  });
}

function cbrExtractLinux(pathFile, tmpFolder) {
  return new Promise((resolve, reject) => {
    const rar = new Unrar(pathFile);

    rar.extract(tmpFolder, null, (err) => {
      if (err) reject(err);
      resolve({ tmpFolder });
    });
  });
}

function createTmpFolder(file) {
  const folder = path.join(app.getPath('temp'), file);

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  return folder;
}

const API = {
  openFile,
  removeFilesByExtensions,
};

module.exports = API;
