import { Library } from '@vcr/domain'

export class LibraryStoreService {
  private library: Library = null

  get () {
    return this.library
  }

  set (lib: Library) {
    this.library = lib
  }
}
