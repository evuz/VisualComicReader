import {
  ProcessMainAdapter,
  IpcMessages,
  KeysListenerAdapter
} from '@vcr/domain'
import { Observable } from 'rxjs'
import { DEPS_SYMBOL } from 'depsin'

import { IMessageOptions, ShortcutsRepository } from './ShortcutsRepository'
import { DialogAdapter } from '../../Adapters/Dialog/DialogAdapter'
import { Symbols } from '../../symbols'

export class ElectronShortcutsRepository implements ShortcutsRepository {
  static [DEPS_SYMBOL] = [
    Symbols.ProcessMain,
    Symbols.Dialog,
    Symbols.KeysListener
  ]

  constructor (
    private processMain: ProcessMainAdapter,
    private dialog: DialogAdapter,
    private keysListener: KeysListenerAdapter
  ) {}

  onShowInfo (): Observable<any> {
    return this.processMain.listen(IpcMessages.ShowInfoShortcut)
  }

  showInfo ({ type, title, message }: IMessageOptions) {
    return this.dialog.show({
      type,
      title,
      message
    })
  }

  register () {
    this.processMain.listen(IpcMessages.RegisterShortcut).subscribe({
      next: ({ payload, id }) => {
        this.keysListener.register(payload?.key).subscribe(() => {
          this.processMain.emit(IpcMessages.RegisterShortcut, { id })
        })
      }
    })
    return Promise.resolve()
  }
}
