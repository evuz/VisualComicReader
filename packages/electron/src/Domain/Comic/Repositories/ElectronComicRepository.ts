import { ProcessMainAdapter, IpcMessages } from '@vcr/domain'

import { ComicRepository } from './ComicRepository'

export class ElectronComicRepository implements ComicRepository {
  constructor(private processMain: ProcessMainAdapter) {}

  selectFile() {
    return this.processMain.listen(IpcMessages.SelectFile)
  }
}
