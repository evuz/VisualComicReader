const { app } = require('electron');

const fs = require('fs');
const path = require('path');

function readDirectory(dir, cb) {
  fs.readdir(dir, cb);
}

function removeTmpFolder() {
  const tmpPath = path.join(app.getPath('temp'), 'VisualComicReader');
  deleteFolderRecursive(tmpPath);
}

function deleteFolderRecursive(pathFolder) {
  if (fs.existsSync(pathFolder)) {
    fs.readdirSync(pathFolder).forEach((file) => {
      const curPath = `${pathFolder}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(pathFolder);
  }
}

function createTmpFolder(file) {
  const folder = file ?
    path.join(app.getPath('temp'), 'VisualComicReader', file) :
    path.join(app.getPath('temp'), 'VisualComicReader');
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  } else {
    deleteFolderRecursive(folder);
    createTmpFolder(file);
  }

  return folder;
}

const API = {
  readDirectory,
  removeTmpFolder,
  createTmpFolder,
};

module.exports = API;
