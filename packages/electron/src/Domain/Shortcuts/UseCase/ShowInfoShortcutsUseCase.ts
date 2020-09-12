import { UseCase } from '@vcr/domain'

import { ShowInfoShortcutsService } from '../Services/ShowInfoShortcutsService'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'

export class ShowInfoShortcutsUseCase implements UseCase {
  constructor(
    @inject(Symbols.ShowInfoShortcutsService)
    private service: ShowInfoShortcutsService
  ) {}

  execute() {
    return this.service.execute()
  }
}
