import { Listener } from '@vcr/domain'

import { LibraryRepository } from '../Repositories/LibraryRepository'

export class LibraryListener implements Listener {
  constructor (private repository: LibraryRepository) {}

  execute () {
    return this.repository.listenLibraryChanges()
  }
}
