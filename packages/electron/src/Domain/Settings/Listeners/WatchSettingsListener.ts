import { Listener, Settings } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { startWith } from 'rxjs/operators'

import { Symbols } from '../../symbols'
import { SettingsRepository } from '../Repositories/SettingsRepository'

export class WatchSettingsListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.SettingsRepository, Symbols.Settings]

  constructor (
    private settingsRepository: SettingsRepository,
    private settings: Settings
  ) {}

  // TODO: Review
  execute () {
    return this.settingsRepository
      .watchSettings()
      .pipe(
        startWith(this.settings.get())
      )
  }
}
