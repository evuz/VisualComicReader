import { BrowserWindow } from 'electron'
import { ScreenAdapter } from './ScreenAdapter'

export class ElectronScreen implements ScreenAdapter {
  get state() {
    return this.window.isFullScreen()
  }

  constructor(private window: BrowserWindow) {}

  toggleFullscreen() {
    this.setFullscreen(!this.state)
  }

  setFullscreen(enable: boolean) {
    this.window.setFullScreen(enable)
  }
}
