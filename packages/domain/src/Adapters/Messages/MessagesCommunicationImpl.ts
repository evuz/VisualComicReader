import { filter, map, take } from 'rxjs/operators'

import { MessagesCommunicationAdapter } from './MessagesCommunicationAdapter'
import { uuid } from '../../Utils/uuid'
import { Message, MessageType, MessageChannelAdapter } from './MessageChannelAdapter'

export class MessagesCommunicationImpl implements MessagesCommunicationAdapter {
  constructor (private channel: MessageChannelAdapter) {}

  public emit (type: MessageType, payload?: Message) {
    this.channel.send(type, payload)
  }

  public listen (type: MessageType) {
    return this.channel.on(type).pipe(map((args) => {
      const response = (payload: Message['payload']) => {
        this.emit(type, { payload, id: args?.id })
      }
      return { ...args, response }
    }))
  }

  public request (type: MessageType, payload?: Message) {
    const id = uuid(6)
    const promise = this.listen(type)
      .pipe(
        filter((args: Message) => args?.id === id),
        take(1)
      )
      .toPromise()
    this.emit(type, { id, ...payload })
    return promise
  }
}
