const fs = require('fs');

function readDirectory(dir, cb) {
    fs.readdir(dir, cb);
}

function removeTmpFolder() {
    const tmpFolder = __dirname + '/../../tmp';
    deleteFolderRecursive(tmpFolder);
}

function deleteFolderRecursive (path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(file => {
      var curPath = path + '/' + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const API = {
    readDirectory,
    removeTmpFolder
}

module.exports = API;