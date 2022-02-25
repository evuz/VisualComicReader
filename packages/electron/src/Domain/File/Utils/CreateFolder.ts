import { FileSystemAdapter } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'

// TODO: Remove this class and move this logic to NodeFileSystem
export class CreateFolder {
  static [DEPS_SYMBOL] = [Symbols.FileSystem]

  constructor (private fileSystem: FileSystemAdapter) {}

  async execute (folderPath: string) {
    const exist = await this.fileSystem.exist(folderPath)
    if (exist) {
      throw Error('Folder already exist')
    }

    await this.fileSystem.mkDir(folderPath)
  }
}
