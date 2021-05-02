import { FileSystemAdapter, Service, ISettings } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { IConfig } from '../../Config/models/Config'
import { Symbols } from '../../symbols'

export class WriteSettingsService implements Service {
  static [DEPS_SYMBOL] = [Symbols.Config, Symbols.FileSystem]

  constructor (private config: IConfig, private fs: FileSystemAdapter) {}

  async execute (conf: ISettings) {
    const configPath = this.config.paths.config
    await this.fs.writeJson(configPath, conf)
  }
}
