import { ProcessMainAdapter, IpcMessages } from '@vcr/domain'
import { Observable } from 'rxjs'

import { ShortcutsRepository } from './ShortcutsRepository'
import { DialogAdapter } from '../../Adapters/Dialog/DialogAdapter'

export class ElectronShortcutsRepository implements ShortcutsRepository {
  constructor(
    private processMain: ProcessMainAdapter,
    private dialog: DialogAdapter,
    // TODO: implement config type
    private config: any
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
