const fs = require('fs');
const path = require('path');

function readDirectory(dir, cb) {
  fs.readdir(dir, cb);
}

function removeTmpFolder() {
  const tmpFolder = path.join(__dirname, '..', '..', 'tmp');
  deleteFolderRecursive(tmpFolder);
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

const API = {
  readDirectory,
  removeTmpFolder,
};

module.exports = API;
