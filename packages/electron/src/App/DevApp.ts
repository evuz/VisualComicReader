import { BrowserWindow, protocol } from 'electron'
import * as path from 'path'

import { App } from './App'

export class DevApp extends App {
  protected async load () {
    const window = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    })
    this.runStaticServer()
    await window.loadURL('http://localhost:3000')
    window.webContents.openDevTools()

    return window
  }

  private async runStaticServer () {
    await this.app.whenReady()

    protocol.registerFileProtocol('local', (request, fn) => {
      const url = request.url.substr(7)
      const redirect = path.normalize(`${process.cwd()}/${url}`)

      fn({ path: redirect })
    })
  }
}
