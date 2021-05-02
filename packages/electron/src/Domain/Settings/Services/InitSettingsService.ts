import { ISettings, Service, Settings } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { ReadSettingsService } from '../Services/ReadSettingsService'
import { Symbols } from '../../symbols'

export class InitSettingsService implements Service {
  static [DEPS_SYMBOL] = [Symbols.ReadSettingsService, Symbols.Settings]

  constructor (
    private readConfiguration: ReadSettingsService,
    private settings: Settings
  ) {}

  async execute (): Promise<void> {
    const config = await this.readConfiguration.execute()
    Object.keys(config).forEach((key) => {
      type Key = keyof ISettings
      this.settings.set(key as Key, config[key as Key])
    })
  }
}
