import { Service } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'
import { ShortcutsRepository } from '../Repositories/ShortcutsRepository'

export class RegisterShortcutsService implements Service {
  static [DEPS_SYMBOL] = [Symbols.ShortcutsRepository]

  constructor(private repository: ShortcutsRepository) {}

  execute() {
    return this.repository.register()
  }
}
