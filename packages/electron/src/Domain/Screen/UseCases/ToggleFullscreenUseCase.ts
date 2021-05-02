import { UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'
import { ElectronScreenRepository } from '../Repositories/ElectronScreenRepository'

// TODO: move to service
export class ToggleFullscreenUsecase implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.ScreenRepository]

  constructor (private repository: ElectronScreenRepository) {}

  execute () {
    return this.repository.toggleFullscreen()
  }
}
