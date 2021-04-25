import { FileSystemAdapter, Service, IConfiguration } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { IConfig } from '../../Config/models/Config'
import { Symbols } from '../../symbols'

export class ReadConfigurationFileService implements Service {
  static [DEPS_SYMBOL] = [Symbols.Config, Symbols.FileSystem]

  constructor (private config: IConfig, private fs: FileSystemAdapter) {}

  async execute (): Promise<IConfiguration> {
    const exist = await this.fs.exist(this.config.paths.config)
    if (!exist) {
      return {}
    }

    return this.fs.readJson(this.config.paths.config)
  }
}
