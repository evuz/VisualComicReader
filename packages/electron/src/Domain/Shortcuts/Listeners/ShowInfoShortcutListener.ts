import { Listener } from '@vcr/domain'
import { ShortcutsRepository } from '../Repositories/ShortcutsRepository'

export class ShowInfoShortcutListener implements Listener {
  constructor(private repository: ShortcutsRepository) {}

  execute() {
    return this.repository.onShowInfo()
  }
}
