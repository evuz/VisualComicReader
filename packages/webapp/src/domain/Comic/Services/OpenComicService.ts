import { Service } from '@vcr/domain'
import { ComicRepository } from '../Repositories/ComicRepository'

export class OpenComicService implements Service {
  constructor(private repository: ComicRepository) {}

  execute(file: any) {
    return this.repository.openComic(file)
  }
}
