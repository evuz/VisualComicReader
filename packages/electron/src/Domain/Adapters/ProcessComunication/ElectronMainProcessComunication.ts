import { ElectronProcessMain, IpcMessages, IpcArgs } from '@vcr/domain'
import { IpcMain, WebContents } from 'electron'

export class ElectronMainProcessComunication extends ElectronProcessMain {
  constructor(ipc: IpcMain, private webcontents: WebContents) {
    super(ipc)
  }

  public emit(message: IpcMessages, args?: IpcArgs) {
    this.webcontents.send(message, args)
  }
}
