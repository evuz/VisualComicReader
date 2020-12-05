import * as paths from 'path'
import { File } from '@vcr/domain'
import { ZipExtract } from '../Utils/ZipExtract'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'
import { CreateTmpFolder } from '../Utils/CreateTmpFolder'
import { IConfig } from '../../Config/models/Config'
import { RarExtract } from '../Utils/RarExtract'

interface Executer {
  run(): Promise<any>
}

export class OpenFileFactory {
  static [DEPS_SYMBOL] = [Symbols.Config]

  constructor(private config: IConfig) {}

  get(path: File): Executer {
    const extension = paths.extname(path)
    switch (extension) {
      case '.cbz':
        return new ZipExtract(path, CreateTmpFolder.factory(this.config))
      case '.cbr':
        return new RarExtract(path, CreateTmpFolder.factory(this.config))
      default:
        throw Error(`Extension ${extension} is not supported`)
    }
  }
}
