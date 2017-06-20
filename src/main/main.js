const electron = require('electron');

const {
  app,
  globalShortcut,
  BrowserWindow,
  ipcMain,
} = electron;

const { removeTmpFolder, createTmpFolder } = require('./directory');
const { selectOpenFile, changeFile, setFileMainWindows } = require('./files');
const { showShorcutInfo } = require('./info');
const registerShortcuts = require('./shortcuts');

let mainWindow;

const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadURL(winURL);

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

  createTmpFolder();
  setFileMainWindows(mainWindow);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') {
    removeTmpFolder();
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('next-file', () => {
  changeFile('next');
});

ipcMain.on('previous-file', () => {
  changeFile('previous');
});

ipcMain.on('open-file', () => {
  selectOpenFile();
});

ipcMain.on('show-info-shortcut', () => {
  showShorcutInfo(process.platform);
});
