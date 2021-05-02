import { ISettings, IpcMessages, ProcessMainAdapter } from '@vcr/domain'
import { SettingsRepository } from './SettingsRepository'

export class ElectronSettingsRepository implements SettingsRepository {
  constructor (private electron: ProcessMainAdapter) {}

  async updateSettings (conf: Partial<ISettings>) {
    this.electron.emit(IpcMessages.UpdateSettings, { payload: conf })
  }
}
