import { ISettings } from '@vcr/domain'
import chokidar from 'chokidar'
import { DEPS_SYMBOL } from 'depsin'
import { Subject } from 'rxjs'

import { Configuration } from '../../Configuration/Entities/Configuration'
import { Symbols } from '../../symbols'
import { ReadSettingsService } from '../Services/ReadSettingsService'
import { SettingsRepository } from './SettingsRepository'

export class NodeSettingsRepository implements SettingsRepository {
  static [DEPS_SYMBOL] = [Symbols.Config, Symbols.ReadSettingsService]

  private subject = new Subject<ISettings>()

  constructor (
    private config: Configuration,
    private readSettings: ReadSettingsService
  ) {
    this.runWatcher()
  }

  watchSettings () {
    return this.subject.asObservable()
  }

  private runWatcher () {
    const configPath = this.config.get('paths').config
    chokidar.watch(configPath).on('change', () => this.updateConfig())
  }

  private async updateConfig () {
    const config = await this.readSettings.execute()
    this.subject.next(config)
  }
}
