import { UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { IConfig } from '../../Config/models/Config'
import { Symbols } from '../../symbols'
import { RemoveFolder } from '../Utils/RemoveFolder'

export class ClearTmpFolder implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.Config, Symbols.RemoveFolder]

  constructor(private config: IConfig, private removeFolder: RemoveFolder) {}

  execute() {
    return this.removeFolder.execute(this.config.paths.tmp)
  }
}
