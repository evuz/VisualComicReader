import { Path, UseCase } from '@vcr/domain'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'
import { OpenComicService } from '../Services/OpenComicService'

export class OpenComicUseCase implements UseCase {
  constructor(
    @inject(Symbols.OpenComicService) private service: OpenComicService
  ) {}

  execute(path: Path) {
    return this.service.execute(path)
  }
}
