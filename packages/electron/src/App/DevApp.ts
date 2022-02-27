import { BrowserWindow, protocol } from 'electron'
import * as path from 'path'

import { App } from './App'

export class DevApp extends App {
  protected async load () {
    console.log(process.cwd())
    const window = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'preload.js')
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
