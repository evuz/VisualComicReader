import { BrowserWindow, globalShortcut } from 'electron'

import { openFile } from '../utils/files'
import { domain } from '../Domain'

export function registerShortcuts(window: BrowserWindow) {
  globalShortcut.register('Right', () => {
    window.webContents.send('right-press')
  })

  globalShortcut.register('Left', () => {
    window.webContents.send('left-press')
  })

  globalShortcut.register('CommandOrControl + Up', () => {
    window.webContents.send('ctrl-up-press')
  })

  globalShortcut.register('CommandOrControl + Down', () => {
    window.webContents.send('ctrl-down-press')
  })

  globalShortcut.register('CommandOrControl + F', () => {
    window.setFullScreen(!window.isFullScreen())
  })

  globalShortcut.register('CommandOrControl + O', () => {
    openFile(window as any)
  })

  globalShortcut.register('CommandOrControl + S', () => {
    domain().getUseCase('showInfoShortcuts').execute()
  })
}
