import { Listener } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'
import { SettingsRepository } from '../Repositories/SettingsRepository'

export class WatchSettingsListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.SettingsRepository]

  constructor (
    private settingsRepository: SettingsRepository
  ) {}

  execute () {
    return this.settingsRepository.watchSettings()
  }
}
