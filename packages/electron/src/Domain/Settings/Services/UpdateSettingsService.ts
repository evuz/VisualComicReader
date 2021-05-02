import { DEPS_SYMBOL } from 'depsin'
import { ISettings } from '@vcr/domain'

import { Symbols } from '../../symbols'
import { ReadSettingsService } from './ReadSettingsService'
import { WriteSettingsService } from './WriteSettingsService'

export class UpdateSettingsService {
  static [DEPS_SYMBOL] = [Symbols.ReadSettingsService, Symbols.WriteSettingsService];

  constructor (
    private readSettings: ReadSettingsService,
    private writeSettings: WriteSettingsService
  ) {}

  async execute (update: Partial<ISettings>) {
    const appConfig = this.readSettings.execute()
    const newConfig = Object.assign(appConfig, update)
    this.writeSettings.execute(newConfig)
  }
}
