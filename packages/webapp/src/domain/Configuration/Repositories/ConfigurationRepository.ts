import { IConfiguration } from '@vcr/domain'

export interface ConfigurationRepository {
  updateConfiguration(config: Partial<IConfiguration>): Promise<void>
}
