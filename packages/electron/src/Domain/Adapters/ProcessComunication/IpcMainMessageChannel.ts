import type { IpcMain, WebContents } from 'electron'
import type { IpcArgs, IpcMessages, MessageChannelAdapter } from '@vcr/domain'
import { Observable } from 'rxjs'

import { IpcChannel, IpcMessage } from './IpcMessageChannel'

export class IpcMainMessageChannel implements MessageChannelAdapter {
  private ipc: IpcMain
  private webcontents: WebContents

  constructor (ipc: IpcMain, webcontents: WebContents) {
    this.ipc = ipc
    this.webcontents = webcontents
  }

  on (type: IpcMessages): Observable<IpcArgs> {
    return new Observable<IpcArgs>((obs) => {
      const fn = (_: unknown, args: IpcArgs) => {
        obs.next(args)
      }
      this.ipc.on(type, fn)

      return () => this.ipc.off(type, fn)
    })
  }

  send (type: IpcMessages, payload: IpcArgs): void {
    const message: IpcMessage = {
      type,
      data: payload
    }

    this.webcontents.send(IpcChannel.Main, message)
  }
}
