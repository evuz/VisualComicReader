import { IpcMessages, ProcessMainAdapter, Service } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { switchMap } from 'rxjs/operators'

import { Symbols } from '../../symbols'
import { LibrarySettingListener } from '../Listeners/LibrarySettingListener'
import { WatchLibraryListener } from '../Listeners/WatchLibraryListener'
import { ReadLibraryService } from './ReadLibraryService'

export class WatchLibraryService implements Service {
  static [DEPS_SYMBOL] = [
    Symbols.LibrarySettingListener,
    Symbols.ProcessMain,
    Symbols.WatchLibraryListener,
    Symbols.ReadLibraryService
  ]

  constructor (
    private librarySettingListener: LibrarySettingListener,
    private processMain: ProcessMainAdapter,
    private watchLibraryListener: WatchLibraryListener,
    private readLibraryService: ReadLibraryService
  ) {}

  execute () {
    this.librarySettingListener.execute()
      .pipe(
        switchMap(() => {
          return this.watchLibraryListener.execute()
        })
      ).subscribe(async () => {
        const library = await this.readLibraryService.execute()
        this.processMain.emit(IpcMessages.Library, { payload: library })
      })
    return Promise.resolve()
  }
}
