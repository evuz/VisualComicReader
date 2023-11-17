import { MessageType, MessagesCommunicationAdapter, UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'

export class SelectFileListener implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.ProcessMain]

  constructor (private processMain: MessagesCommunicationAdapter) {}

  execute () {
    return this.processMain.listen<string[]>(MessageType.SelectFile)
  }
}
