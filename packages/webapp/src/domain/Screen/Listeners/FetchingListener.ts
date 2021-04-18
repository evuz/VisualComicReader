import { UseCase } from '@vcr/domain'
import { ScreenRepository } from '../Repositories/ScreenRepository'

export class FetchingListener implements UseCase {
  constructor (private repository: ScreenRepository) {}

  execute () {
    return this.repository.onLoading()
  }
}
