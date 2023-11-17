import { Observable } from 'rxjs'

export enum MessageType {
  SelectFile = 'select-file',
  OpenFile = 'open-file',
  Library = 'library',
  SelectDirectory = 'select-directory',
  ToggleFullscreen = 'toggle-fullscreen',
  ShowInfoShortcut = 'show-info-shortcut',
  RegisterShortcut = 'register-shortcut',
  UpdateSettings = 'update-settings',
  Fetching = 'fetching',
}

export type Message<T = unknown> = {
  id?: string
  payload?: T
}

export type MessageChannelAdapter = {
  on<T>(type: MessageType): Observable<Message<T>>
  send(type: MessageType, args: Message): void
}
