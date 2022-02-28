import { BrowserWindow } from 'electron'
import * as path from 'path'

import { App } from './App'

export class ProdApp extends App {
  protected async load () {
    const window = new BrowserWindow({
      height: 600,
      width: 800,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    await window.loadFile(path.join(__dirname, 'renderer', 'index.html'))

    return window
  }
}
