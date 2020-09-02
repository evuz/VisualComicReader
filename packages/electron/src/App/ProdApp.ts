import { BrowserWindow } from 'electron'
import * as path from 'path'

import { App } from './App'

export class ProdApp extends App {
  protected load() {
    this.window = new BrowserWindow({
      height: 600,
      width: 800,
      show: false,
    })
    this.window.loadFile(
      path.join(__dirname, '..', '..', 'renderer', 'index.html')
    )
    return this.window
  }
}
