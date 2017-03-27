const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain;

const url = require('url');
const openFile = require('./files').openFile;
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
      console.log(err);
    }
    event.sender.send('file-extracted', req)
  });
})

ipc.on('read-directory', (event, data) => {
  readDirectory(data, (err, files) => {
    if(err) {
      event.sender.send('list-files', {err})
    }
    event.sender.send('list-files', {files})
  })
})