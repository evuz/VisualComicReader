import { Observable } from 'rxjs'
import { IpcArgs, IpcMessages } from './MessageChannelAdapter'

export type IpcRequest = IpcArgs & {
  response(args: IpcArgs['payload']): void
}

// TODO: Change ProcessMain to ProcessComunication
export interface ProcessMainAdapter {
  emit(message: IpcMessages, args?: IpcArgs): void
  listen(message: IpcMessages): Observable<IpcRequest>
  request(messsage: IpcMessages, args?: IpcArgs): Promise<IpcArgs>
}
