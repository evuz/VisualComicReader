import {
  globalShortcut,
  BrowserWindow,
  GlobalShortcut as ElectronGlobalShortcut
} from 'electron'
import { KeysListenerAdapter } from '@vcr/domain'
import { Observable } from 'rxjs'

const MOD_KEY = 'CmdOrCtrl'

export class GlobalShortcut implements KeysListenerAdapter {
  static factory (browserWindow: BrowserWindow) {
    return new GlobalShortcut(browserWindow, globalShortcut)
  }

  private shortcuts: { [key: string]: () => void } = {}

  constructor (
    private browserWindow: BrowserWindow,
    private globalShortcut: ElectronGlobalShortcut
  ) {
    this.handleFocus()
  }

  register (keys: string) {
    keys = keys.replace('$mod', MOD_KEY)
    return new Observable<void>((obs) => {
      const fn = function () {
        obs.next()
      }

      this.shortcuts[keys] = fn
      this.globalShortcut.register(keys, fn)

      return () => {
        this.globalShortcut.unregister(keys)
        this.shortcuts[keys] = null
      }
    })
  }

  private handleFocus () {
    this.browserWindow.on('blur', () => {
      this.globalShortcut.unregisterAll()
    })

    this.browserWindow.on('focus', () => {
      Object.entries(this.shortcuts).forEach(([key, shortcutFn]) => {
        if (!shortcutFn) {
          return
        }
        this.globalShortcut.register(key, shortcutFn)
      })
    })
  }
}
