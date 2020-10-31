import { ProcessMainAdapter, Comic, IpcMessages } from '@vcr/domain'

import { ComicRepository } from './ComicRepository'

export class ElectronComicRepository implements ComicRepository {
  constructor(private processMain: ProcessMainAdapter) {}

  async openComic(file: string): Promise<Comic> {
    // TODO: map response to Comic
    return this.processMain.request(IpcMessages.OpenFile, {
      payload: file,
    }) as any
  }
}
