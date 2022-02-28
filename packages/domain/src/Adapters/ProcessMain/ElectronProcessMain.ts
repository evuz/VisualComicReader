import { filter, map, take } from 'rxjs/operators'

import {
  ProcessMainAdapter
} from './ProcessMainAdapter'
import { uuid } from '../../Utils/uuid'
import { IpcArgs, IpcMessages, MessageChannelAdapter } from './MessageChannelAdapter'

export class ElectronProcessMain implements ProcessMainAdapter {
  constructor (private channel: MessageChannelAdapter) {}

  public emit (message: IpcMessages, args?: IpcArgs) {
    this.channel.send(message, args)
  }

  public listen (message: IpcMessages) {
    return this.channel.on(message).pipe(map((args) => {
      const response = (payload: IpcArgs['payload']) => {
        this.emit(message, { payload, id: args?.id })
      }
      return { ...args, response }
    }))
  }

  public request (messsage: IpcMessages, args?: IpcArgs) {
    const id = uuid(6)
    const promise = this.listen(messsage)
      .pipe(
        filter((args: IpcArgs) => args?.id === id),
        take(1)
      )
      .toPromise()
    this.emit(messsage, { id, ...args })
    return promise
  }
}
