import { UseCase } from '@vcr/domain'
import { inject } from 'depsin'

import { ComicRepository } from '../Repositories/ComicRepository'
import { Symbols } from '../../symbols'

export class SelectFileListener implements UseCase {
  constructor(
    @inject(Symbols.ComicRepository) private repository: ComicRepository
  ) {}

  execute() {
    return this.repository.onSelectComic()
  }
}
