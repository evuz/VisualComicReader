const electron = require('electron');
const dialog = electron.dialog;

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
            extensions: ['cbr', 'cbz', 'pdf']
        }]
    }, files => {
        if (!files) {
            const err = 'Archivo no válido';
            cb({ err });
            return;
        }
        const pathFile = files[0];
        extractFiles(pathFile)
            .then(req => {
                cb(null, req);
            }).catch(err => {
                console.log(err);
                cb(err)
            })
    })
}

function extractFiles(pathFile) {
    const file = path.basename(pathFile);
    let tmpFolder = createTmpFolder(file);

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
        cbz(pathFile, { dir: tmpFolder }, err => {
            if (err) reject(err)

            resolve({ tmpFolder });
        });
    })
}

function cbrExtract(pathFile, tmpFolder) {
    if (process.platform == 'linux') {
        return cbrExtractLinux(pathFile, tmpFolder);
    }
    return new Promise((resolve, reject) => {
        cbr(pathFile, tmpFolder, (err) => {
            if (err) {
                reject(err)
            }
            resolve({ tmpFolder })
        })
    })
}

function cbrExtractLinux(pathFile, tmpFolder) {
    return new Promise((resolve, reject) => {
        const rar = new Unrar(pathFile);

        rar.extract(tmpFolder, null, err => {
            if (err) reject(err)
            resolve({ tmpFolder });
        })
    })
}

function createTmpFolder(file) {
    let folder = path.normalize(__dirname + '/../../tmp/');
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    folder = folder + file;
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    return folder;
}

const API = {
    openFile
}

module.exports = API;