const electron = require('electron');
const dialog = electron.dialog;

const fs = require('fs');
const Unrar = require('node-unrar');

function openFile(cb) {
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory'],
        filters: [{
        name: 'Comic Files',
        extensions: ['cbr', 'cbz', 'pdf']
        }]
    }, files => {
        if (!files) {
            const err = 'Archivo no válido';
            cb({err});
            return;
        }
        const file = files[0]
        createTmpFolder(file);
        let rar = new Unrar(file);
        let tmpFolder = '/Users/jesgombel/Documents/projects/React/electron/tmp/' + file.split('/').pop();
        rar.extract(tmpFolder, null, err => {
            if (err) {
                cb(err);
                return;
            }
            cb(null, {file, tmpFolder});
        });
    })
}

function createTmpFolder(pathFile) {
    let folder = '/Users/jesgombel/Documents/projects/React/electron/tmp/';
    if(!fs.existsSync(folder)) { 
        fs.mkdirSync(folder);           
    }
    folder = folder + pathFile.split('/').pop();
    if(!fs.existsSync(folder)) { 
        fs.mkdirSync(folder);           
    }
}

const API = {
    openFile
}

module.exports = API;