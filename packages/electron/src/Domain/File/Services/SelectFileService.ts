import { FileManagerAdapter, Service } from '@vcr/domain'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'

export class SelectFileService implements Service {
  constructor(
    @inject(Symbols.FileManager) private fileManager: FileManagerAdapter
  ) {}

  execute(extensions: string[]) {
    return this.fileManager.selectFile(extensions)
  }
}
