import { Listener } from '@vcr/domain'
import { ShortcutsRepository } from '../Repositories/ShortcutsRepository'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'

export class ShowInfoShortcutListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.ShortcutsRepository]

  constructor (private repository: ShortcutsRepository) {}

  execute () {
    return this.repository.onShowInfo()
  }
}
