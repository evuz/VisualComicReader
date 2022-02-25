import { IpcMessages, Listener, ProcessMainAdapter } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'

export class UpdateSettingsListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.ProcessMain]

  constructor (
    private processMain: ProcessMainAdapter
  ) {}

  execute () {
    return this.processMain.listen(IpcMessages.UpdateSettings)
  }
}
