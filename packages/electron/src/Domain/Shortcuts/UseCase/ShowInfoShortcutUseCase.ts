import { UseCase } from '@vcr/domain'

import { ShowInfoShortcutService } from '../Services/ShowInfoShortcustService'

export class ShowInfoShortcutUseCase implements UseCase {
  constructor(private service: ShowInfoShortcutService) {}

  execute() {
    return this.service.execute()
  }
}
