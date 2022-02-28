import { MessagesCommunicationAdapter, uuid, MessageType } from '@vcr/domain'
import { filter } from 'rxjs/operators'

import { ShortcutRepository } from './ShortcutRepository'
import { Observable } from 'rxjs'

export class ElectronShortcutRepository implements ShortcutRepository {
  constructor (private processMain: MessagesCommunicationAdapter) {}

  register (key: string): Observable<any> {
    const id = uuid()

    this.processMain.emit(MessageType.RegisterShortcut, {
      payload: { key },
      id
    })

    return this.processMain
      .listen(MessageType.RegisterShortcut)
      .pipe(filter(({ id: messageId }) => messageId === id))
  }

  showInfo () {
    return this.processMain.emit(MessageType.ShowInfoShortcut)
  }
}
