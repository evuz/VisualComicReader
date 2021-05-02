import { FileSystemAdapter, Service, ISettings } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { IConfiguration } from '../../Configuration/Entities/Configuration'
import { Symbols } from '../../symbols'

export class WriteSettingsService implements Service {
  static [DEPS_SYMBOL] = [Symbols.Config, Symbols.FileSystem]

  constructor (private config: IConfiguration, private fs: FileSystemAdapter) {}

  async execute (conf: ISettings) {
    const configPath = this.config.paths.config
    await this.fs.writeJson(configPath, conf)
  }
}
