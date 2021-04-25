import { Observable } from 'rxjs'

export enum IpcMessages {
  SelectFile = 'select-file',
  OpenFile = 'open-file',
  Library = 'library',
  SelectDirectory = 'select-directory',
  ToggleFullscreen = 'toggle-fullscreen',
  ShowInfoShortcut = 'show-info-shortcut',
  RegisterShortcut = 'register-shortcut',
  UpdateConfiguration = 'update-configuration',
  Fetching = 'fetching',
}

export type IpcArgs = {
  id?: string
  payload?: any
}

export type IpcRequest = IpcArgs & {
  response(args: IpcArgs['payload']): void
}

// TODO: Change ProcessMain to ProcessComunication
export interface ProcessMainAdapter {
  emit(message: IpcMessages, args?: IpcArgs): void
  listen(message: IpcMessages): Observable<IpcRequest>
  request(messsage: IpcMessages, args?: IpcArgs): Promise<IpcArgs>
}
