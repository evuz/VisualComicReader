import type { Message, MessageType } from '@vcr/domain'

export enum IpcChannel {
  Main = 'IpcMainChannel'
}

export type IpcMessage<T = unknown> = {
  type: MessageType,
  data: Message<T>
}
