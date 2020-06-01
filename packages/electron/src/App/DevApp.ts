import { BrowserWindow, screen } from 'electron'

import { App } from './App'

export class DevApp extends App {
  protected load() {
    this.window = new BrowserWindow({
      show: false,
    })
    this.window.loadURL('http://localhost:3000')
    this.window.webContents.openDevTools()
    return this.window
  }
}
