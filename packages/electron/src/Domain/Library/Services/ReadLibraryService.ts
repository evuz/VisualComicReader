import { Library, Service, Settings } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'
import { LibraryRepository } from '../Repositories/LibraryRepository'

export class ReadLibraryService implements Service {
  static [DEPS_SYMBOL] = [Symbols.Settings, Symbols.LibraryRepository]

  constructor (
    private settings: Settings,
    private repository: LibraryRepository
  ) {}

  execute (): Promise<Library | null> {
    if (!this.settings.get('libraryPath')) {
      return Promise.resolve(null)
    }

    return this.repository.readLibrary()
  }
}
