import { Service } from '@vcr/domain'
import { ShortcutsRepository } from '../Repositories/ShortcutsRepository'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'

export class ShowInfoShortcutService implements Service {
  constructor(
    @inject(Symbols.ShortcutsRepository) private repository: ShortcutsRepository
  ) {}

  execute() {
    return this.repository.showInfo()
  }
}
