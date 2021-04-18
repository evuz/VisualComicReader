import { ProcessMainAdapter, uuid, IpcMessages } from '@vcr/domain'
import { filter } from 'rxjs/operators'

import { ShortcutRepository } from './ShortcutRepository'
import { Observable } from 'rxjs'

export class ElectronShortcutRepository implements ShortcutRepository {
  constructor (private processMain: ProcessMainAdapter) {}

  register (key: string): Observable<any> {
    const id = uuid()

    this.processMain.emit(IpcMessages.RegisterShortcut, {
      payload: { key },
      id
    })

    return this.processMain
      .listen(IpcMessages.RegisterShortcut)
      .pipe(filter(({ id: messageId }) => messageId === id))
  }

  showInfo () {
    return this.processMain.emit(IpcMessages.ShowInfoShortcut)
  }
}
