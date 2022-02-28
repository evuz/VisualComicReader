import { MessagesCommunicationAdapter, MessageType } from '@vcr/domain'
import tinikeys from 'tinykeys'

import { ShortcutRepository } from './ShortcutRepository'
import { Observable } from 'rxjs'

const REPLACES = [
  { exp: /Left/gi, value: 'ArrowLeft' }, { exp: /Right/gi, value: 'ArrowRight' }, { exp: /Up/gi, value: 'ArrowUp' }, { exp: /Down/gi, value: 'ArrowDown' }]

export class BrowserShortcutRepository implements ShortcutRepository {
  static factory (processMain: MessagesCommunicationAdapter) {
    return new BrowserShortcutRepository(processMain, window)
  }

  constructor (
    private processMain: MessagesCommunicationAdapter,
    private window: Window
  ) {}

  register (key: string): Observable<any> {
    key = REPLACES.reduce((acc, { exp, value }) => {
      return acc.replace(exp, value)
    }, key)

    return new Observable((obs) => {
      tinikeys(this.window, {
        [key]: () => obs.next()
      })
      return () => obs.complete()
    })
  }

  showInfo () {
    return this.processMain.emit(MessageType.ShowInfoShortcut)
  }
}
