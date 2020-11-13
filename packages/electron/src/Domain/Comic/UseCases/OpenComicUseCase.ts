import { UseCase } from '@vcr/domain'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'
import { OpenComicService } from '../Services/OpenComicService'

export class OpenComicUseCase implements UseCase {
  constructor(
    @inject(Symbols.OpenComicService) private service: OpenComicService
  ) {}

  execute(filePath: string) {
    return this.service.execute(filePath)
  }
}
