const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain;

const url = require('url');
const openFile = require('./files').openFile;

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(url.format({
    pathname: 'localhost:8080',
    protocol: 'http',
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
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('open-file-dialog', event => {
  openFile((err, req) => {
    if(err) {
      console.log(err);
    }
    event.sender.send('file-extracted', req)
  });
})