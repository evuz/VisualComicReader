import { globalShortcut } from 'electron'
import { KeysListenerAdapter } from '@vcr/domain'
import { Observable } from 'rxjs'

const MOD_KEY = 'CmdOrCtrl'

export class GlobalShortcut implements KeysListenerAdapter {
  register(keys: string) {
    keys = keys.replace('$mod', MOD_KEY)
    return new Observable<void>((obs) => {
      globalShortcut.register(keys, () => {
        obs.next()
      })
      return () => {
        globalShortcut.unregister(keys)
      }
    })
  }
}
