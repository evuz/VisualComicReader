import { App as ElectronApp, BrowserWindow } from 'electron'

import { Domain, createDomain } from '../Domain'

export abstract class App {
  protected window: BrowserWindow
  protected domain: Domain

  constructor (protected app: ElectronApp) {
    app.allowRendererProcessReuse = true
    // TODO: init appListen with a new method run
    this.applisten()
  }

  protected abstract load(): BrowserWindow

  private show () {
    this.load()
    this.domain = createDomain(this.window)
    this.domain().getUseCase('init').execute()

    this.window.once('ready-to-show', () => this.window.show())
  }

  private applisten () {
    this.app.on('ready', () => this.show())
    this.app.on('window-all-closed', () => this.close())
    this.app.on('activate', () => this.activate())
  }

  private close () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      this.app.quit()
    }
  }

  private activate () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      this.show()
    }
  }
}
