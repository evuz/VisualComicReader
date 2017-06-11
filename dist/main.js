const electron = require('electron');

const {
  app,
  globalShortcut,
  BrowserWindow,
  ipcMain,
} = electron;

const path = require('path');
const url = require('url');
const { removeTmpFolder } = require('./electron/directory');
const { openFile } = require('./electron/files');
const { showShorcutInfo } = require('./electron/info');
const registerShortcuts = require('./electron/shortcuts');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true,
  }));

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

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  removeTmpFolder();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('open-file', () => {
  openFile(mainWindow);
});

ipcMain.on('show-info-shortcut', () => {
  showShorcutInfo(process.platform);
});
