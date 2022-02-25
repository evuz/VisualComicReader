import { Service, Settings } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'
import { WatchSettingsListener } from '../Listeners/WatchSettingsListener'
import { ReadSettingsService } from './ReadSettingsService'

export class WatchSettingsService implements Service {
  static [DEPS_SYMBOL] = [
    Symbols.WatchSettingsListener,
    Symbols.ReadSettingsService,
    Symbols.Settings
  ]

  constructor (
    private watchSettingsListener: WatchSettingsListener,
    private readSettingsService: ReadSettingsService,
    private settings: Settings
  ) {}

  execute () {
    this.watchSettingsListener.execute().subscribe(async () => {
      const settings = await this.readSettingsService.execute()
      this.settings.set(settings)
    })
    return Promise.resolve()
  }
}
