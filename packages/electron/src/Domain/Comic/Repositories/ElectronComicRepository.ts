import { ProcessMainAdapter, IpcMessages } from '@vcr/domain'

import { ComicRepository } from './ComicRepository'

export class ElectronComicRepository implements ComicRepository {
  constructor(private processMain: ProcessMainAdapter) {}

  onSelectComic() {
    return this.processMain.listen(IpcMessages.SelectFile)
  }
}
