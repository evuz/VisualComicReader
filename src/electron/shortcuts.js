const { globalShortcut } = require('electron');

function registerShortcuts(mainWindow) {
    globalShortcut.register('Right', () => {
        mainWindow.webContents.send('right-press');
    })


    globalShortcut.register('Left', () => {
        mainWindow.webContents.send('left-press');
    })
}

module.exports = registerShortcuts;