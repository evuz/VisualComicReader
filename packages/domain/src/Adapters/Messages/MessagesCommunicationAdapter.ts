import { Observable } from 'rxjs'
import { Message, MessageType } from './MessageChannelAdapter'

export type MessageReceived = Message & {
  response(payload: Message['payload']): void
}

export interface MessagesCommunicationAdapter {
  emit(type: MessageType, args?: Message): void
  listen(type: MessageType): Observable<MessageReceived>
  request(type: MessageType, args?: Message): Promise<Message>
}
