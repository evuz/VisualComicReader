import { Listener } from '@vcr/domain'
import { ShortcutRepository } from '../Repositories/ShortcutRepository'

export class RegisterShortcutListener implements Listener {
  constructor(private repository: ShortcutRepository) {}

  execute(key: string) {
    return this.repository.register(key)
  }
}
