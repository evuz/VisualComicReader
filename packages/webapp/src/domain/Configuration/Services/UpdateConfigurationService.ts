import { Service, IConfiguration } from '@vcr/domain'
import { ConfigurationRepository } from '../Repositories/ConfigurationRepository'

export class UpdateConfigurationService implements Service {
  constructor (private repository: ConfigurationRepository) {}

  execute (conf: Partial<IConfiguration>) {
    return this.repository.updateConfiguration(conf)
  }
}
