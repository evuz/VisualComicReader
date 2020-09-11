import { ProcessMainAdapter, IpcMessages } from '@vcr/domain'
import { Observable } from 'rxjs'

import { ShortcutsRepository } from './ShortcutsRepository'
import { DialogAdapter } from '../../Adapters/Dialog/DialogAdapter'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'

export class ElectronShortcutsRepository implements ShortcutsRepository {
  constructor(
    @inject(Symbols.ProcessMain) private processMain: ProcessMainAdapter,
    @inject(Symbols.Dialog) private dialog: DialogAdapter,
    // TODO: implement config type
    @inject(Symbols.Config) private config: any
  ) {}

  onShowInfo(): Observable<any> {
    return this.processMain.listen(IpcMessages.ShowInfoShortcut)
  }

  showInfo() {
    const ctrlOrCmd = this.config.platform === 'darwin' ? 'Cmd' : 'Ctrl'
    return this.dialog.show({
      type: 'info',
      message: 'Shortcuts',
      detail: `
    ${ctrlOrCmd} + F: Enable/disable fullscreen \n
    ${ctrlOrCmd} + O: OpenFile \n
    ${ctrlOrCmd} + S: Show shortcuts \n
    ${ctrlOrCmd} + Down: Zoom Out \n
    ${ctrlOrCmd} + Up: Zoom In \n
    Left: Previous page \n
    Right: Next page \n
    `,
      noLink: true,
    })
  }
}
