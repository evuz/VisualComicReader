import { Listener } from '@vcr/domain'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'
import { ScreenRepository } from '../Repositories/ScreenRepository'

export class ToggleFullscreenListener implements Listener {
  constructor(
    @inject(Symbols.ScreenRepository) private repository: ScreenRepository
  ) {}

  execute() {
    return this.repository.onToggleFullscreen()
  }
}
