import { Observable } from 'rxjs'
import { Message, MessageType } from './MessageChannelAdapter'

export type MessageReceived<T = unknown> = Message<T> & {
  response(payload: Message['payload']): void
}

export interface MessagesCommunicationAdapter {
  emit(type: MessageType, args?: Message): void
  listen<T>(type: MessageType): Observable<MessageReceived<T>>
  request<T>(type: MessageType, args?: Message): Promise<Message<T>>
}
