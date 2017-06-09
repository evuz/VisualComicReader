const electron = require('electron');
const {
  app,
  globalShortcut,
  BrowserWindow,
  ipcMain
} = electron;

const path = require('path');
const url = require('url');
const { readDirectory, removeTmpFolder } = require('./electron/directory');
const { openFile, removeFilesByExtensions } = require('./electron/files');
const registerShortcuts = require('./electron/shortcuts');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  mainWindow.on('blur', () => {
    globalShortcut.unregisterAll();
  });
  mainWindow.on('focus', () => {
    registerShortcuts(mainWindow);
  });
  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.send('enter-full-screen');
  });
  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.send('leave-full-screen');
  });

  if (process.env.NODE_ENV == 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  globalShortcut.unregisterAll();
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

ipcMain.on('open-file', event => {
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
        if (err) throw new Error(err);
        req = Object.assign({}, req, { files });
        event.sender.send('file-extracted', req)
      })
    })
  });
})
