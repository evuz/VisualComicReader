import { Observable } from 'rxjs'
import { filter, take } from 'rxjs/operators'

import { IpcMessages, IpcArgs, ProcessMainAdapter } from './ProcessMainAdapter'
import { uuid } from '../../Utils/uuid'

export class ElectronProcessMain implements ProcessMainAdapter {
  constructor(private ipc: any) {}

  public emit(message: IpcMessages, args?: IpcArgs) {
    this.ipc.send(message, args)
  }

  public listen(message: IpcMessages) {
    return new Observable<IpcArgs>((obs) => {
      const fn = (_, args: IpcArgs) => obs.next(args)
      this.ipc.on(message, fn)
      return () => this.ipc.off(message, fn)
    })
  }

  public request(messsage: IpcMessages, args?: IpcArgs) {
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
