import { UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { IConfiguration } from '../../Configuration/Entities/Configuration'
import { Symbols } from '../../symbols'
import { RemoveFolder } from '../Utils/RemoveFolder'

export class ClearTmpFolder implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.Config, Symbols.RemoveFolder]

  constructor (private config: IConfiguration, private removeFolder: RemoveFolder) {}

  execute () {
    return this.removeFolder.execute(this.config.paths.tmp)
  }
}
