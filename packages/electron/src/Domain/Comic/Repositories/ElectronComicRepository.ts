import { ProcessMainAdapter, IpcMessages } from '@vcr/domain'

import { ComicRepository } from './ComicRepository'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'

export class ElectronComicRepository implements ComicRepository {
  constructor(
    @inject(Symbols.ProcessMain) private processMain: ProcessMainAdapter
  ) {}

  onSelectComic() {
    return this.processMain.listen(IpcMessages.SelectFile)
  }
}
