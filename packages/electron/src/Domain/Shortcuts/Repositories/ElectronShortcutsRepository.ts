import {
  MessagesCommunicationAdapter,
  MessageType,
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
    private processMain: MessagesCommunicationAdapter,
    private dialog: DialogAdapter,
    private keysListener: KeysListenerAdapter
  ) {}

  onShowInfo (): Observable<any> {
    return this.processMain.listen(MessageType.ShowInfoShortcut)
  }

  showInfo ({ type, title, message }: IMessageOptions) {
    return this.dialog.show({
      type,
      title,
      message
    })
  }

  register () {
    this.processMain.listen(MessageType.RegisterShortcut).subscribe({
      next: ({ payload, id }) => {
        this.keysListener.register(payload?.key).subscribe(() => {
          this.processMain.emit(MessageType.RegisterShortcut, { id })
        })
      }
    })
    return Promise.resolve()
  }
}
