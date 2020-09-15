import { BrowserWindow, dialog } from 'electron'

import { DialogAdapter, MessageOptions } from './DialogAdapter'

export class ElectronDialog implements DialogAdapter {
  constructor(private browserWindow: BrowserWindow) {}

  show(opts: MessageOptions): Promise<any> {
    return dialog.showMessageBox(this.browserWindow, opts)
  }
}
