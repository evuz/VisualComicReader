import { Listener } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'
import { LibraryRepository } from '../Repositories/LibraryRepository'

export class WatchLibraryListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.LibraryRepository]

  constructor (private repository: LibraryRepository) {}

  execute () {
    return this.repository.watchLibrary()
  }
}
