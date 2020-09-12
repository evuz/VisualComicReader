import { globalShortcut, BrowserWindow } from 'electron'
import { KeysListenerAdapter } from '@vcr/domain'
import { Observable } from 'rxjs'

const MOD_KEY = 'CmdOrCtrl'

export class GlobalShortcut implements KeysListenerAdapter {
  private shortcuts: { [key: string]: () => void } = {}

  constructor(private browserWindow: BrowserWindow) {
    this.handleFocus()
  }

  register(keys: string) {
    keys = keys.replace('$mod', MOD_KEY)
    return new Observable<void>((obs) => {
      const fn = function () {
        obs.next()
      }

      this.shortcuts[keys] = fn
      globalShortcut.register(keys, fn)

      return () => {
        globalShortcut.unregister(keys)
        this.shortcuts[keys] = null
      }
    })
  }

  private handleFocus() {
    this.browserWindow.on('blur', () => {
      globalShortcut.unregisterAll()
    })

    this.browserWindow.on('focus', () => {
      Object.entries(this.shortcuts).forEach(([key, shortcutFn]) => {
        if (!shortcutFn) {
          return
        }
        globalShortcut.register(key, shortcutFn)
      })
    })
  }
}
