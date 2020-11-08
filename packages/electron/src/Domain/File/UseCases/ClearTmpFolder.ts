import { UseCase } from '@vcr/domain'
import { inject } from 'depsin'
import { IConfig } from '../../Config/models/Config'
import { Symbols } from '../../symbols'
import { RemoveFolder } from '../Utils/RemoveFolder'

export class ClearTmpFolder implements UseCase {
  constructor(
    @inject(Symbols.Config) private config: IConfig,
    @inject(Symbols.RemoveFolder) private removeFolder: RemoveFolder
  ) {}

  execute() {
    return this.removeFolder.execute(this.config.paths.tmp)
  }
}
