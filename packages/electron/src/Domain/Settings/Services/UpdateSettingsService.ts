import { DEPS_SYMBOL } from 'depsin'
import { ISettings, Settings } from '@vcr/domain'

import { Symbols } from '../../symbols'
import { WriteSettingsService } from './WriteSettingsService'

export class UpdateSettingsService {
  static [DEPS_SYMBOL] = [Symbols.WriteSettingsService, Symbols.Settings];

  constructor (
    private writeSettings: WriteSettingsService,
    private settings: Settings
  ) {}

  async execute (update: Partial<ISettings>) {
    const appConfig = this.settings.get()
    const newConfig = Object.assign(appConfig, update)
    this.writeSettings.execute(newConfig)
  }
}
