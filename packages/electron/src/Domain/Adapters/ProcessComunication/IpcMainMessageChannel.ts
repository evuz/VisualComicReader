import type { IpcMain, WebContents } from 'electron'
import type { Message, MessageType, MessageChannelAdapter } from '@vcr/domain'
import { Observable } from 'rxjs'

import { IpcChannel, IpcMessage } from './IpcMessageChannel'

export class IpcMainMessageChannel implements MessageChannelAdapter {
  private ipc: IpcMain
  private webcontents: WebContents

  constructor (ipc: IpcMain, webcontents: WebContents) {
    this.ipc = ipc
    this.webcontents = webcontents
  }

  on<T> (type: MessageType): Observable<Message<T>> {
    return new Observable<Message<T>>((obs) => {
      const fn = (_: unknown, args: Message<T>) => {
        obs.next(args)
      }
      this.ipc.on(type, fn)

      return () => this.ipc.off(type, fn)
    })
  }

  send (type: MessageType, payload: Message): void {
    const message: IpcMessage = {
      type,
      data: payload
    }

    this.webcontents.send(IpcChannel.Main, message)
  }
}
