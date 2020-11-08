import { Path, UseCase } from '@vcr/domain'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'
import { OpenFileService } from '../Services/OpenFileService'

export class OpenFileUseCase implements UseCase {
  constructor(
    @inject(Symbols.OpenFileService) private service: OpenFileService
  ) {}

  execute(path: Path) {
    return this.service.execute(path)
  }
}
