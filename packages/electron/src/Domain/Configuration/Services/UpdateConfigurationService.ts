import { DEPS_SYMBOL } from 'depsin'
import { IConfiguration } from '@vcr/domain'

import { Symbols } from '../../symbols'
import { ReadConfigurationFileService } from './ReadConfigurationFileService'
import { WriteConfigurationFileService } from './WriteConfigurationFileService'

export class UpdateConfigurationService {
  static [DEPS_SYMBOL] = [Symbols.ReadConfigurationFileService, Symbols.WriteConfigurationFileService];

  constructor (
    private readConfigFile: ReadConfigurationFileService,
    private writeConfigFile: WriteConfigurationFileService
  ) {}

  async execute (update: Partial<IConfiguration>) {
    const appConfig = this.readConfigFile.execute()
    const newConfig = Object.assign(appConfig, update)
    this.writeConfigFile.execute(newConfig)
  }
}
