import { UseCase } from '@vcr/domain'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'
import { SelectFileService } from '../Services/SelectFileService'

export class SelectFileUseCase implements UseCase {
  constructor(
    @inject(Symbols.SelectFileService) private service: SelectFileService
  ) {}

  execute(extensions: string[]) {
    return this.service.execute(extensions)
  }
}
