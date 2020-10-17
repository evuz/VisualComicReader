import { UseCase } from '@vcr/domain'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'
import { ElectronScreenRepository } from '../Repositories/ElectronScreenRepository'

export class ToggleFullscreenUsecase implements UseCase {
  constructor(
    @inject(Symbols.ScreenRepository)
    private repository: ElectronScreenRepository
  ) {}

  execute() {
    return this.repository.toggleFullscreen()
  }
}
