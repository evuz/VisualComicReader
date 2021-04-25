import { UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'

import { Symbols } from '../../symbols'
import { SelectDirectoryService } from '../Services/SelectDirectoryService'

export class SelectDirectoryUseCase implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.SelectDirectoryService]

  constructor (private service: SelectDirectoryService) {}

  execute () {
    return this.service.execute()
  }
}
