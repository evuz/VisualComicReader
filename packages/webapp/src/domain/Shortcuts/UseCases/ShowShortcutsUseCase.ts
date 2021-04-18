import { UseCase } from '@vcr/domain'
import { ShortcutRepository } from '../Repositories/ShortcutRepository'

export class ShowShortcutsUseCase implements UseCase {
  constructor (private repository: ShortcutRepository) {}

  execute () {
    return Promise.resolve(this.repository.showInfo())
  }
}
