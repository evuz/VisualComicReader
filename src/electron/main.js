const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain;

const url = require('url');
const { openFile, removeFilesByExtensions } = require('./files');
const { readDirectory, removeTmpFolder } = require('./directory');

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  mainWindow.loadURL(url.format({
    pathname: __dirname + '/../../dist/index.html',
    protocol: 'file',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    removeTmpFolder();
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('open-file', event => {
  removeTmpFolder();
  openFile((err, req) => {
    if (err) {
      throw new Error(err);
    }

    const { tmpFolder } = req;
    readDirectory(tmpFolder, (err, files) => {
      const ext = ['.jpg', '.png'];
      
      removeFilesByExtensions(files, tmpFolder, ext)
      readDirectory(tmpFolder, (err, files) => {
        if(err) console.log(err);
        req = Object.assign({}, req, { files });
        event.sender.send('file-extracted', req)
      })
    })
  });
})
