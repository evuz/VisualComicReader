import { MessageType, MessagesCommunicationAdapter, Service } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { startWith, switchMap } from 'rxjs/operators'

import { Symbols } from '../../symbols'
import { LibrarySettingListener } from '../Listeners/LibrarySettingListener'
import { WatchLibraryListener } from '../Listeners/WatchLibraryListener'
import { LibraryStoreService } from './LibraryStoreService'
import { ReadLibraryService } from './ReadLibraryService'

export class WatchLibraryService implements Service {
  static [DEPS_SYMBOL] = [
    Symbols.LibrarySettingListener,
    Symbols.ProcessMain,
    Symbols.WatchLibraryListener,
    Symbols.ReadLibraryService,
    Symbols.LibraryStoreService
  ]

  constructor (
    private librarySettingListener: LibrarySettingListener,
    private processMain: MessagesCommunicationAdapter,
    private watchLibraryListener: WatchLibraryListener,
    private readLibraryService: ReadLibraryService,
    private libraryStore: LibraryStoreService
  ) {}

  execute () {
    this.librarySettingListener.execute()
      .pipe(
        switchMap(() => {
          // Hacky to solve bug type
          // https://github.com/ReactiveX/rxjs/issues/4772
          return this.watchLibraryListener.execute().pipe(startWith(<string>null))
        })
      ).subscribe(async () => {
        const library = await this.readLibraryService.execute()
        this.libraryStore.set(library)
        this.processMain.emit(MessageType.Library, { payload: library })
      })
    return Promise.resolve()
  }
}
