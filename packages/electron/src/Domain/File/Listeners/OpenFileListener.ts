import { IpcMessages, ProcessMainAdapter, UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'

export class OpenFileListener implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.ProcessMain]

  constructor(private processMain: ProcessMainAdapter) {}

  execute() {
    return this.processMain.listen(IpcMessages.OpenFile)
  }
}
