import { FileManagerAdapter, Service } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'

export class SelectDirectoryService implements Service {
  static [DEPS_SYMBOL] = [Symbols.FileManager];

  constructor (private fileManager: FileManagerAdapter) {}

  async execute () {
    const directory = await this.fileManager.selectDirectory()
    return directory
  }
}
