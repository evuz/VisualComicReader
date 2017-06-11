const { globalShortcut } = require('electron');
const { openFile } = require('./files');
const { showShorcutInfo } = require('./info');

function registerShortcuts(mainWindow) {
  globalShortcut.register('Right', () => {
    mainWindow.webContents.send('right-press');
  });

  globalShortcut.register('Left', () => {
    mainWindow.webContents.send('left-press');
  });

  globalShortcut.register('CommandOrControl + Up', () => {
    mainWindow.webContents.send('ctrl-up-press');
  });

  globalShortcut.register('CommandOrControl + Down', () => {
    mainWindow.webContents.send('ctrl-down-press');
  });

  globalShortcut.register('CommandOrControl + F', () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });

  globalShortcut.register('CommandOrControl + O', () => {
    openFile(mainWindow);
  });

  globalShortcut.register('CommandOrControl + S', () => {
    showShorcutInfo();
  });
}

module.exports = registerShortcuts;
