import { IpcMessages, Listener, ProcessMainAdapter } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { tap } from 'rxjs/operators'

import { Symbols } from '../../symbols'
import { UpdateConfigurationService } from '../Services/UpdateConfigurationService'

export class UpdateConfigurationListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.ProcessMain, Symbols.UpdateConfigurationService]

  constructor (private processMain: ProcessMainAdapter, private updateConfiguration: UpdateConfigurationService) {}

  execute () {
    return this.processMain.listen(IpcMessages.UpdateConfiguration)
      .pipe(tap(async ({ payload, response }) => {
        await this.updateConfiguration.execute(payload)
        response(null)
      }))
  }
}
