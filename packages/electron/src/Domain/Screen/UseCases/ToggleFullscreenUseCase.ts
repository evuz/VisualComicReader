import { UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'
import { ElectronScreenRepository } from '../Repositories/ElectronScreenRepository'

export class ToggleFullscreenUsecase implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.ScreenRepository]

  constructor (private repository: ElectronScreenRepository) {}

  execute () {
    return this.repository.toggleFullscreen()
  }
}
