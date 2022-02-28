import type { IpcArgs, IpcMessages } from '@vcr/domain'

export enum IpcChannel {
  Main = 'IpcMainChannel'
}

export type IpcMessage = {
  type: IpcMessages,
  data: IpcArgs
}
