import { BrowserWindow, protocol } from 'electron'
import * as path from 'path'

import { App } from './App'

export class DevApp extends App {
  protected load() {
    this.window = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
      },
    })
    this.runStaticServer()
    this.window.loadURL('http://localhost:3000')
    this.window.webContents.openDevTools()
    return this.window
  }

  private async runStaticServer() {
    await this.app.whenReady()

    protocol.registerFileProtocol('local', (request, fn) => {
      const url = request.url.substr(7)
      const redirect = path.normalize(`${process.cwd()}/${url}`)

      fn({ path: redirect })
    })
  }
}
