import * as path from 'path'
import * as crypto from 'crypto'

import { IConfig } from '../../Config/models/Config'
import { CreateFolder } from './CreateFolder'

export class CreateTmpFolder {
  constructor (private config: IConfig, private createFolder: CreateFolder) {}

  async run (filePath: string) {
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
      isNew
    }
  }
}
