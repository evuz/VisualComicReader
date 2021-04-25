import { UseCase } from '@vcr/domain'

import { SelectLibraryService } from '../Services/SelectLibraryService'

export class SelectLibraryUseCase implements UseCase {
  constructor (private service: SelectLibraryService) {}

  execute () {
    return this.service.execute()
  }
}
