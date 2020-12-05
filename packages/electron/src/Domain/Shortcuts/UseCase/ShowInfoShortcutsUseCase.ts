import { UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { ShowInfoShortcutsService } from '../Services/ShowInfoShortcutsService'
import { Symbols } from '../../symbols'

export class ShowInfoShortcutsUseCase implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.ShowInfoShortcutsService]

  constructor(private service: ShowInfoShortcutsService) {}

  execute() {
    return this.service.execute()
  }
}
