import { UseCase } from '@vcr/domain'
import { ScreenRepository } from '../Repositories/ScreenRepository'

export class ToggleFullscrenUseCase implements UseCase {
  constructor (private service: ScreenRepository) {}

  execute () {
    return this.service.toggleFullscreen()
  }
}
