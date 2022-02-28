import type { Message, MessageType } from '@vcr/domain'

export enum IpcChannel {
  Main = 'IpcMainChannel'
}

export type IpcMessage = {
  type: MessageType,
  data: Message
}
