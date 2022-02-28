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

// TODO: use T = unknown
export type Message<T = any> = {
  id?: string
  payload?: T
}

export type MessageChannelAdapter = {
  on(type: MessageType): Observable<Message>
  send(type: MessageType, args: Message): void
}
