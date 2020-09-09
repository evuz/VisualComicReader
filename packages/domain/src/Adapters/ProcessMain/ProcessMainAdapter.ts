import { Observable } from 'rxjs'

export enum IpcMessages {
  SelectFile = 'select_file',
  ReadFile = 'read_file',
}

export type IpcArgs = {
  id?: string
  payload?: any
}

export interface ProcessMainAdapter {
  emit(message: IpcMessages, args?: IpcArgs): void
  listen(message: IpcMessages): Observable<IpcArgs>
  request(messsage: IpcMessages, args?: IpcArgs): Promise<IpcArgs>
}
