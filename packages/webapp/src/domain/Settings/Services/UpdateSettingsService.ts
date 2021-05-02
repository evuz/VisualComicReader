import { Service, ISettings } from '@vcr/domain'
import { SettingsRepository } from '../Repositories/SettingsRepository'

export class UpdateSettingsService implements Service {
  constructor (private repository: SettingsRepository) {}

  execute (conf: Partial<ISettings>) {
    return this.repository.updateSettings(conf)
  }
}
