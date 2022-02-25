import { Service } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'

import { RequestLibraryListener } from '../Listeners/RequestLibraryListener'
import { LibraryStoreService } from './LibraryStoreService'

export class RequestLibraryService implements Service {
  static [DEPS_SYMBOL] = [Symbols.RequestLibraryListener, Symbols.LibraryStoreService]

  constructor (private listener: RequestLibraryListener, private store: LibraryStoreService) {}

  execute () {
    this.listener.execute().subscribe(({ response }) => {
      const library = this.store.get()
      response(library)
    })

    return Promise.resolve()
  }
}
