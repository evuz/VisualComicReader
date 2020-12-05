import { Listener } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'
import { ScreenRepository } from '../Repositories/ScreenRepository'

export class ToggleFullscreenListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.ScreenRepository]

  constructor(private repository: ScreenRepository) {}

  execute() {
    return this.repository.onToggleFullscreen()
  }
}
