import { Service } from '@vcr/domain'
import { ShortcutsRepository } from '../Repositories/ShortcutsRepository'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'
import { Configuration } from '../../Configuration/Entities/Configuration'

export class ShowInfoShortcutsService implements Service {
  static [DEPS_SYMBOL] = [Symbols.ShortcutsRepository, Symbols.Config]

  constructor (
    private repository: ShortcutsRepository,
    private config: Configuration
  ) {}

  execute () {
    const ctrlOrCmd = this.config.get('platform') === 'darwin' ? 'Cmd' : 'Ctrl'

    return this.repository.showInfo({
      type: 'none',
      title: 'Shortcuts',
      message: `
        ${ctrlOrCmd} + F: Enable/disable fullscreen \n
        ${ctrlOrCmd} + O: OpenFile \n
        ${ctrlOrCmd} + S: Show shortcuts \n
        ${ctrlOrCmd} + Down: Zoom Out \n
        ${ctrlOrCmd} + Up: Zoom In \n
        Left: Previous page \n
        Right: Next page \n
      `
    })
  }
}
