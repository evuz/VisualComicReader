import { filter, map, take } from 'rxjs/operators'

import { MessagesCommunicationAdapter } from './MessagesCommunicationAdapter'
import { uuid } from '../../Utils/uuid'
import { Message, MessageType, MessageChannelAdapter } from './MessageChannelAdapter'

export class MessagesCommunicationImpl implements MessagesCommunicationAdapter {
  constructor (private channel: MessageChannelAdapter) {}

  public emit (type: MessageType, payload?: Message) {
    this.channel.send(type, payload)
  }

  public listen<T> (type: MessageType) {
    return this.channel.on(type).pipe(map((args: Message<T>) => {
      const response = (payload: Message<T>['payload']) => {
        this.emit(type, { payload, id: args?.id })
      }
      return { ...args, response }
    }))
  }

  public request<T> (type: MessageType, payload?: Message) {
    const id = uuid(6)
    const promise = this.listen<T>(type)
      .pipe(
        filter((args) => args?.id === id),
        take(1)
      )
      .toPromise()
    this.emit(type, { id, ...payload })
    return promise
  }
}
