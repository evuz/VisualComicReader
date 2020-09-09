import { Observable } from 'rxjs'
import { filter, take } from 'rxjs/operators'

import { IpcMessages, IpcArgs, ProcessMainAdapter } from './ProcessMainAdapter'
import { uuid } from '../../Utils/uuid'

export function electronProcessMain(ipc: any): ProcessMainAdapter {
  function emit(message: IpcMessages, args?: IpcArgs) {
    ipc.send(message, args)
  }

  function listen(message: IpcMessages) {
    return new Observable<IpcArgs>((obs) => {
      const fn = (args: IpcArgs) => obs.next(args)
      ipc.on(message, fn)
      return () => ipc.off(message, fn)
    })
  }

  function request(messsage: IpcMessages, args?: IpcArgs) {
    const id = uuid(6)
    const promise = listen(messsage)
      .pipe(
        filter((args: IpcArgs) => args?.id === id),
        take(1)
      )
      .toPromise()
    emit(messsage, { id, ...args })
    return promise
  }

  return {
    emit,
    listen,
    request,
  }
}
