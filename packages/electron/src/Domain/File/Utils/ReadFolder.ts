import { FileSystemAdapter } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'

export class ReadFolder {
  static [DEPS_SYMBOL] = [Symbols.FileSystem]

  constructor (private fs: FileSystemAdapter) {}

  execute (folder: string) {
    return this.fs.readDir(folder)
  }
}
