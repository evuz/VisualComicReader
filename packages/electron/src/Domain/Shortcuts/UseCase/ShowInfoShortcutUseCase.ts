import { UseCase } from '@vcr/domain'

import { ShowInfoShortcutService } from '../Services/ShowInfoShortcustService'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'

export class ShowInfoShortcutUseCase implements UseCase {
  constructor(
    @inject(Symbols.ShowInfoShortcutsService)
    private service: ShowInfoShortcutService
  ) {}

  execute() {
    return this.service.execute()
  }
}
