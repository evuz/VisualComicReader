import { UseCase } from '@vcr/domain'
import { ComicRepository } from '../Repositories/ComicRepository'

export class SelectFileListener implements UseCase {
  constructor(private repository: ComicRepository) {}

  execute() {
    return this.repository.selectFile()
  }
}
