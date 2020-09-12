import { App as ElectronApp, BrowserWindow, ipcMain } from 'electron'

import { changeFile, selectOpenFile, setFileMainWindows } from '../utils/files'
import { createTmpFolder } from '../utils/directory'
import { registerShortcuts } from './registerShortcuts'

import { Domain, createDomain } from '../Domain'

export abstract class App {
  protected window: BrowserWindow
  protected domain: Domain

  constructor(protected app: ElectronApp) {
    // TODO: init appListen with a new method run
    this.applisten()
  }

  protected abstract load(): BrowserWindow

  private show() {
    this.load()
    createTmpFolder()
    setFileMainWindows(this.window)
    this.domain = createDomain(this.window)
    this.ipcListen()
    this.domain().getUseCase('registerShortcuts').execute()
    registerShortcuts(this.window)
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

    this.domain()
      .getListener('showInfoShortcuts')
      .execute()
      .subscribe(() => {
        this.domain().getUseCase('showInfoShortcuts').execute()
      })

    this.domain()
      .getListener('selectFile')
      .execute()
      .subscribe(() => {
        selectOpenFile()
      })
  }
}
