import { IpcMessages, ProcessMainAdapter, UseCase } from '@vcr/domain'
import { inject } from 'depsin'

import { Symbols } from '../../symbols'

export class OpenFileListener implements UseCase {
  constructor(
    @inject(Symbols.ProcessMain) private processMain: ProcessMainAdapter
  ) {}

  execute() {
    return this.processMain.listen(IpcMessages.OpenFile)
  }
}
