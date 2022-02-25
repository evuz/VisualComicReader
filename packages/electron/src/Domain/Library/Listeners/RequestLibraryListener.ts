import { IpcMessages, Listener, ProcessMainAdapter } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { filter } from 'rxjs/operators'
import { Symbols } from '../../symbols'

export class RequestLibraryListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.ProcessMain]

  constructor (private processMain: ProcessMainAdapter) {}

  execute () {
    return this.processMain
      .listen(IpcMessages.Library)
      .pipe(filter(({ id }) => Boolean(id)))
  }
}
