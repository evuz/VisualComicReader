import { Service } from '@vcr/domain'
import { ShortcutsRepository } from '../Repositories/ShortcutsRepository'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'

export class ShowInfoShortcutsService implements Service {
  constructor(
    @inject(Symbols.ShortcutsRepository)
    private repository: ShortcutsRepository,
    // TODO: implement config type
    @inject(Symbols.Config) private config: any
  ) {}

  execute() {
    const ctrlOrCmd = this.config.platform === 'darwin' ? 'Cmd' : 'Ctrl'

    return this.repository.showInfo({
      type: 'info',
      title: 'Shortcuts',
      message: `
    ${ctrlOrCmd} + F: Enable/disable fullscreen \n
    ${ctrlOrCmd} + O: OpenFile \n
    ${ctrlOrCmd} + S: Show shortcuts \n
    ${ctrlOrCmd} + Down: Zoom Out \n
    ${ctrlOrCmd} + Up: Zoom In \n
    Left: Previous page \n
    Right: Next page \n
    `,
    })
  }
}
