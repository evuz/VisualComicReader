import { UseCase } from '@vcr/domain'
import { inject } from 'depsin'

import { Symbols } from '../../symbols'
import { RegisterShortcutsService } from '../Services/RegisterShortcutsService'

export class RegisterShortcutsUseCase implements UseCase {
  constructor(
    @inject(Symbols.RegisterShortcutsService)
    private service: RegisterShortcutsService
  ) {}

  execute() {
    return this.service.execute()
  }
}
