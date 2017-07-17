const childProcess = require('child_process');
const path = require('path');

function cbr(source, destination, callback) {
  let unrar;

  // Reset the path if platform is darwin
  switch (process.platform) {
    case 'darwin':
      unrar = '../bin/darwin/unrar';
      break;
    default:
      unrar = './bin/win/UnRAR.exe';
      break;
  }

  const dest = path.normalize(path.join(destination, '/'));

  childProcess.execFile(path.join(__dirname, unrar), ['e', '-y', source, dest], (error, stdout) => {
    if (error) {
      return callback(error);
    }
    callback(null, stdout);
  });
}

module.exports = cbr;
