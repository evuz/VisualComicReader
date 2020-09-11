import { Listener } from '@vcr/domain'
import { ShortcutsRepository } from '../Repositories/ShortcutsRepository'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'

export class ShowInfoShortcutListener implements Listener {
  constructor(
    @inject(Symbols.ShortcutsRepository)
    private repository: ShortcutsRepository
  ) {}

  execute() {
    return this.repository.onShowInfo()
  }
}
