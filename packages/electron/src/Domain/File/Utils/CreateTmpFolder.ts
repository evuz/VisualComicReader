import * as path from 'path'
import * as crypto from 'crypto'

import { Configuration } from '../../Configuration/Entities/Configuration'
import { CreateFolder } from './CreateFolder'

// TODO: move folder Comics and rename to CreateComicTmpFolder
export class CreateTmpFolder {
  constructor (private config: Configuration, private createFolder: CreateFolder) {}

  async run (filePath: string) {
    const hashPath = crypto.createHash('md5').update(filePath).digest('hex')
    const tmpPath = path.join(this.config.get('paths').tmp, hashPath)

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
