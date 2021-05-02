import { IpcMessages, Listener, ProcessMainAdapter } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { tap } from 'rxjs/operators'

import { Symbols } from '../../symbols'
import { UpdateSettingsService } from '../Services/UpdateSettingsService'

export class UpdateSettingsListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.ProcessMain, Symbols.UpdateSettingsService]

  constructor (
    private processMain: ProcessMainAdapter,
    private updateSettings: UpdateSettingsService
  ) {}

  // TODO: create a service instead listener
  execute () {
    return this.processMain.listen(IpcMessages.UpdateSettings)
      .pipe(tap(async ({ payload, response }) => {
        await this.updateSettings.execute(payload)
        response(null)
      }))
  }
}
