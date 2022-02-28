import type { IpcRenderer } from 'electron'
import type { IpcArgs, IpcMessages, MessageChannelAdapter } from '@vcr/domain'
import { Observable } from 'rxjs'

import { IpcChannel, IpcMessage } from './IpcMessageChannel'

export class IpcRendererMessageChannel implements MessageChannelAdapter {
  private ipc: IpcRenderer

  constructor (ipc: IpcRenderer) {
    this.ipc = ipc
  }

  on (): Observable<IpcArgs<IpcMessage>> {
    return new Observable<IpcArgs<IpcMessage>>((obs) => {
      const fn = (_: unknown, payload: IpcMessage) => {
        obs.next({ id: payload.data.id, payload })
      }
      this.ipc.on(IpcChannel.Main, fn)

      return () => this.ipc.off(IpcChannel.Main, fn)
    })
  }

  send (type: IpcMessages, payload: IpcArgs): void {
    this.ipc.send(type, payload)
  }
}
