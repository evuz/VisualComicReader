import { Path } from '@vcr/domain'

import * as path from 'path'
import * as crypto from 'crypto'

import { IConfig } from '../../Config/models/Config'
import { CreateFolder, ICreateFolder } from './CreateFolder'

export class CreateTmpFolder {
  static factory(config: IConfig) {
    return new CreateTmpFolder(config, new CreateFolder())
  }

  constructor(private config: IConfig, private createFolder: ICreateFolder) {}

  async run(filePath: Path) {
    const hashPath = crypto.createHash('md5').update(filePath).digest('hex')
    const tmpPath = path.join(this.config.paths.tmp, hashPath)

    let isNew = true

    try {
      await this.createFolder.execute(tmpPath)
    } catch (error) {
      isNew = false
    }

    return {
      folder: tmpPath,
      isNew,
    }
  }
}
