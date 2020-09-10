import { dialog } from 'electron'

import { DialogAdapter, MessageOptions } from './DialogAdapter'

export class ElectronDialog implements DialogAdapter {
  show(opts: MessageOptions): Promise<any> {
    return dialog.showMessageBox(opts)
  }
}
