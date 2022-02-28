import { Observable } from 'rxjs'

export enum IpcMessages {
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
export type IpcArgs<T = any> = {
  id?: string
  payload?: T
}

export type MessageChannelAdapter = {
  on(message: IpcMessages): Observable<IpcArgs>
  send(message: IpcMessages, args: IpcArgs): void
}
