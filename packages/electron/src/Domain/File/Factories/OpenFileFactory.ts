import * as paths from 'path'
import { File } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { ZipExtract } from '../Utils/ZipExtract'
import { Symbols } from '../../symbols'
import { CreateTmpFolder } from '../Utils/CreateTmpFolder'
import { Configuration } from '../../Configuration/Entities/Configuration'
import { UnrarExtract } from '../Utils/UnrarExtract'

interface Executer {
  run(): Promise<any>
}

export class OpenFileFactory {
  static [DEPS_SYMBOL] = [Symbols.Config]

  constructor (
    private config: Configuration,
    private createTmpFolder: CreateTmpFolder
  ) {}

  get (path: File): Executer {
    const extension = paths.extname(path)
    switch (extension) {
      case '.cbz':
        return new ZipExtract(path, this.createTmpFolder)
      case '.cbr':
        return new UnrarExtract(path, this.config, this.createTmpFolder)
      default:
        throw Error(`Extension ${extension} is not supported`)
    }
  }
}
