import { ISettings } from '@vcr/domain'
import chokidar from 'chokidar'
import { DEPS_SYMBOL } from 'depsin'
import { Subject } from 'rxjs'

import { IConfig } from '../../Config/models/Config'
import { Symbols } from '../../symbols'
import { ReadSettingsService } from '../Services/ReadSettingsService'
import { SettingsRepository } from './SettingsRepository'

export class NodeSettingsRepository implements SettingsRepository {
  static [DEPS_SYMBOL] = [Symbols.Config, Symbols.ReadSettingsFileService]

  private subjet = new Subject<ISettings>()

  constructor (
    private config: IConfig,
    private readSettings: ReadSettingsService
  ) {
    this.runWatcher()
  }

  watchSettings () {
    return this.subjet.asObservable()
  }

  private runWatcher () {
    const configPath = this.config.paths.config
    chokidar.watch(configPath).on('change', async () => {
      const config = await this.readSettings.execute()
      this.subjet.next(config)
    })
  }
}
