import { UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'
import { RegisterShortcutsService } from '../Services/RegisterShortcutsService'

export class RegisterShortcutsUseCase implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.RegisterShortcutsService]

  constructor (private service: RegisterShortcutsService) {}

  execute () {
    return this.service.execute()
  }
}
