import { UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'
import { SelectFileService } from '../Services/SelectFileService'

export class SelectFileUseCase implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.SelectFileService]

  constructor (private service: SelectFileService) {}

  execute (extensions: string[]) {
    return this.service.execute(extensions)
  }
}
