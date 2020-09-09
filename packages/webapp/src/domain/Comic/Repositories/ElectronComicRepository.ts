import { ProcessMainAdapter, IpcMessages, Comic } from '@vcr/domain'

import { ComicRepository } from './ComicRepository'

export class ElectronComicRepository implements ComicRepository {
  constructor(private electron: ProcessMainAdapter) {}

  async selectComic(): Promise<Comic> {
    const response = await this.electron.request(IpcMessages.SelectFile, {
      payload: ['cbz', 'cbr'],
    })
    return response.payload
  }
}
