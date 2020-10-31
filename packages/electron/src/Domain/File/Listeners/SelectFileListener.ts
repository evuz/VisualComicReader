import { IpcMessages, ProcessMainAdapter, UseCase } from '@vcr/domain'
import { inject } from 'depsin'

import { Symbols } from '../../symbols'

export class SelectFileListener implements UseCase {
  constructor(
    @inject(Symbols.ProcessMain) private processMain: ProcessMainAdapter
  ) {}

  execute() {
    return this.processMain.listen(IpcMessages.SelectFile)
  }
}
