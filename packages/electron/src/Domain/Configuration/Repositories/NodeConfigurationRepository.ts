import { IConfiguration } from '@vcr/domain'
import chokidar from 'chokidar'
import { DEPS_SYMBOL } from 'depsin'
import { Subject } from 'rxjs'

import { IConfig } from '../../Config/models/Config'
import { Symbols } from '../../symbols'
import { ReadConfigurationFileService } from '../Services/ReadConfigurationFileService'
import { ConfigurationRepository } from './ConfigurationRepository'

export class NodeConfigurationRepository implements ConfigurationRepository {
  private subjet = new Subject<IConfiguration>()
  static [DEPS_SYMBOL] = [Symbols.Config, Symbols.ReadConfigurationFileService]

  constructor (
    private config: IConfig,
    private readConfiguration: ReadConfigurationFileService
  ) {
    this.runWatcher()
  }

  watchConfiguration () {
    return this.subjet.asObservable()
  }

  private runWatcher () {
    const configPath = this.config.paths.config
    chokidar.watch(configPath).on('change', async () => {
      const config = await this.readConfiguration.execute()
      this.subjet.next(config)
    })
  }
}
