import { UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Configuration } from '../../Configuration/Entities/Configuration'
import { Symbols } from '../../symbols'
import { RemoveFolder } from '../Utils/RemoveFolder'

// TODO: move to service instead UseCase
export class ClearTmpFolder implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.Config, Symbols.RemoveFolder]

  constructor (private config: Configuration, private removeFolder: RemoveFolder) {}

  execute () {
    return this.removeFolder.execute(this.config.get('paths').tmp)
  }
}
