import { ISettings, MessageType, MessagesCommunicationAdapter } from '@vcr/domain'
import { SettingsRepository } from './SettingsRepository'

export class ElectronSettingsRepository implements SettingsRepository {
  constructor (private electron: MessagesCommunicationAdapter) {}

  async updateSettings (conf: Partial<ISettings>) {
    this.electron.emit(MessageType.UpdateSettings, { payload: conf })
  }
}
