const fs = require('fs');

const directoryCreated = [];

function readDirectory(dir, cb) {
  fs.readdir(dir, cb);
}

function removeTmpFolder() {
  directoryCreated.forEach((dir) => {
    deleteFolderRecursive(dir);
  });
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

function addDirectoryCreated(directory) {
  directoryCreated.push(directory);
}

const API = {
  readDirectory,
  removeTmpFolder,
  addDirectoryCreated,
};

module.exports = API;
