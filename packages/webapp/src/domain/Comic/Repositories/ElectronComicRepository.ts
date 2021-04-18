import { Comic, FileManagerAdapter } from '@vcr/domain'

import { ComicRepository } from './ComicRepository'

export class ElectronComicRepository implements ComicRepository {
  constructor (private fileManager: FileManagerAdapter) {}

  async selectComic () {
    return this.fileManager.selectFile(['cbz', 'cbr'])
  }

  async openComic (file: string): Promise<Comic> {
    // TODO: map response to Comic
    return this.fileManager.openFile(file) as any
  }
}
