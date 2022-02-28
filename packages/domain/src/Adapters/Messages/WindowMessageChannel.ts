import { Observable, Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { Message, MessageType, MessageChannelAdapter } from './MessageChannelAdapter'

export enum WindowChannel {
  Main,
  Renderer
}

type DataMessage = {
  to: WindowChannel
  type: MessageType
  payload: Message
}

function toFactory (from: WindowChannel) {
  switch (from) {
    case WindowChannel.Main:
      return WindowChannel.Renderer
    default:
      return WindowChannel.Main
  }
}

export class WindowMessageChannel implements MessageChannelAdapter {
  private window: Window
  private id: WindowChannel

  private subject$ = new Subject<DataMessage>()
  public obs$: Observable<DataMessage>

  constructor (window: Window, id: WindowChannel) {
    this.window = window
    this.id = id

    this.window.addEventListener('message', (event) => {
      this.subject$.next(event.data)
    })

    this.obs$ = this.subject$.pipe(
      filter(message => typeof message === 'object'),
      filter((message) => message.to === this.id)
    )
  }

  on (type: MessageType): Observable<Message> {
    return this.obs$.pipe(
      filter((message) => message.type === type),
      map(message => message.payload)
    )
  }

  send (type: MessageType, args: Message): void {
    this.window.postMessage({
      to: toFactory(this.id),
      type,
      payload: args
    }, this.window.document.location.origin)
  }
}
