import * as paths from 'path'
import { Path, File } from '@vcr/domain'
import { ZipExtract } from '../Utils/ZipExtract'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'
import { CreateTmpFolder } from '../Utils/CreateTmpFolder'
import { IConfig } from '../../Config/models/Config'
import { RarExtract } from '../Utils/RarExtract'

interface Executer {
  run(): Promise<File>
}

export class OpenFileFactory {
  constructor(@inject(Symbols.Config) private config: IConfig) {}

  get(path: Path): Executer {
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
