import { FileManagerAdapter, Service } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'

export class SelectFileService implements Service {
  static [DEPS_SYMBOL] = [Symbols.FileManager]

  constructor(private fileManager: FileManagerAdapter) {}

  execute(extensions: string[]) {
    return this.fileManager.selectFile(extensions)
  }
}
