import { IConfiguration, IpcMessages, ProcessMainAdapter } from '@vcr/domain'
import { ConfigurationRepository } from './ConfigurationRepository'

export class ElectronConfigurationRepository implements ConfigurationRepository {
  constructor (private electron: ProcessMainAdapter) {}

  async updateConfiguration (conf: Partial<IConfiguration>) {
    this.electron.emit(IpcMessages.UpdateConfiguration, { payload: conf })
  }
}
