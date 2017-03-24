const fs = require('fs');

function readDirectory(dir, cb) {
    fs.readdir(dir, cb);
}

const API = {
    readDirectory
}

module.exports = API;