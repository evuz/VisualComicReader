import { UseCase } from '@vcr/domain'

import { SelectComicService } from '../Services/SelectComicService'

export class SelectComicUseCase implements UseCase {
  constructor(private service: SelectComicService) {}

  execute() {
    return this.service.execute()
  }
}
