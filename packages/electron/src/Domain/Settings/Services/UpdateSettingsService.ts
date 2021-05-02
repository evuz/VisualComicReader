import { DEPS_SYMBOL } from 'depsin'
import { ISettings } from '@vcr/domain'

import { Symbols } from '../../symbols'
import { ReadSettingsService } from './ReadSettingsService'
import { WriteSettingsService } from './WriteSettingsService'

export class UpdateSettingsService {
  static [DEPS_SYMBOL] = [Symbols.ReadSettingsFileService, Symbols.WriteSettingsFileService];

  constructor (
    private readConfigFile: ReadSettingsService,
    private writeConfigFile: WriteSettingsService
  ) {}

  async execute (update: Partial<ISettings>) {
    const appConfig = this.readConfigFile.execute()
    const newConfig = Object.assign(appConfig, update)
    this.writeConfigFile.execute(newConfig)
  }
}
