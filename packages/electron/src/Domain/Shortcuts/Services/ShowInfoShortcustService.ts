import { Service } from '@vcr/domain'
import { ShortcutsRepository } from '../Repositories/ShortcutsRepository'

export class ShowInfoShortcutService implements Service {
  constructor(private repository: ShortcutsRepository) {}

  execute() {
    return this.repository.showInfo()
  }
}
