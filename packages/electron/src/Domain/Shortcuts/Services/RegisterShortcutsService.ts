import { Service } from '@vcr/domain'
import { inject } from 'depsin'

import { Symbols } from '../../symbols'
import { ShortcutsRepository } from '../Repositories/ShortcutsRepository'

export class RegisterShortcutsService implements Service {
  constructor(
    @inject(Symbols.ShortcutsRepository) private repository: ShortcutsRepository
  ) {}

  execute() {
    return this.repository.register()
  }
}
