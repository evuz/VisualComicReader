import { Listener } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'
import { ConfigurationRepository } from '../Repositories/ConfigurationRepository'

export class ConfigurationChangeListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.ConfigurationRepository]

  constructor (private configurationRepository: ConfigurationRepository) {}

  execute () {
    return this.configurationRepository
      .watchConfiguration()
  }
}
