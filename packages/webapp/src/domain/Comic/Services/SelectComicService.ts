import { Service } from '@vcr/domain'

import { ComicRepository } from '../Repositories/ComicRepository'

export class SelectComicService implements Service {
  constructor(private respository: ComicRepository) {}

  execute() {
    return this.respository.selectComic()
  }
}
