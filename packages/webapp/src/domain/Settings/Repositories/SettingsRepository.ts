import { ISettings } from '@vcr/domain'

export interface SettingsRepository {
  updateSettings(config: Partial<ISettings>): Promise<void>
}
