import { App as ElectronApp, BrowserWindow, ipcMain } from 'electron'

import { changeFile, selectOpenFile, setFileMainWindows } from '../utils/files'
import { showShorcutInfo } from '../utils/info'
import { createTmpFolder } from '../utils/directory'

import { Domain } from '../Domain'

export abstract class App {
  protected window: BrowserWindow

  constructor(protected app: ElectronApp, protected domain: Domain) {
    this.applisten()
    this.ipcListen()
  }

  protected abstract load(): BrowserWindow

  private show() {
    this.load()
    createTmpFolder()
    setFileMainWindows(this.window)
    this.window.once('ready-to-show', () => this.window.show())
  }

  private applisten() {
    this.app.on('ready', () => this.show())
    this.app.on('window-all-closed', () => this.close())
    this.app.on('activate', () => this.activate())
  }

  private close() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      this.app.quit()
    }
  }

  private activate() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      this.show()
    }
  }

  private ipcListen() {
    ipcMain.on('next-file', () => {
      this.window.webContents.send('fetching', true)
      changeFile('next')
    })

    ipcMain.on('previous-file', () => {
      this.window.webContents.send('fetching', true)
      changeFile('previous')
    })

    ipcMain.on('show-info-shortcut', () => {
      showShorcutInfo(process.platform)
    })

    this.domain()
      .getListener('selectFile')
      .execute()
      .subscribe(() => {
        selectOpenFile()
      })
  }
}
