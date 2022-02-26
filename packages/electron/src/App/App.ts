import { App as ElectronApp, BrowserWindow } from 'electron'

import { Domain, createDomain } from '../Domain'

export abstract class App {
  private window: BrowserWindow
  protected domain: Domain

  constructor (protected app: ElectronApp) {
    app.allowRendererProcessReuse = true
    // TODO: init appListen with a new method run
    this.applisten()
  }

  protected abstract load(): Promise<BrowserWindow>

  private async show () {
    this.window = await this.load()
    this.domain = createDomain(this.window)
    this.domain().getUseCase('init').execute()
    this.window.show()
  }

  private applisten () {
    this.app.on('ready', () => this.show())
    this.app.on('window-all-closed', () => this.close())
    this.app.on('activate', () => this.activate())
  }

  private close () {
    this.app.quit()
  }

  private activate () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      this.show()
    }
  }
}
