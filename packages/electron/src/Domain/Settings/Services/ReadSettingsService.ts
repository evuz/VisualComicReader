import { FileSystemAdapter, Service, ISettings, defaultSettings } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Configuration } from '../../Configuration/Entities/Configuration'
import { Symbols } from '../../symbols'

export class ReadSettingsService implements Service {
  static [DEPS_SYMBOL] = [Symbols.Config, Symbols.FileSystem]

  constructor (private config: Configuration, private fs: FileSystemAdapter) {}

  async execute (): Promise<ISettings> {
    const paths = this.config.get('paths')
    const exist = await this.fs.exist(paths.config)
    if (!exist) {
      return defaultSettings
    }

    return this.fs.readJson(paths.config)
  }
}
