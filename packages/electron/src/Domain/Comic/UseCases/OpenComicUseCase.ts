import { UseCase } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Symbols } from '../../symbols'
import { OpenComicService } from '../Services/OpenComicService'

export class OpenComicUseCase implements UseCase {
  static [DEPS_SYMBOL] = [Symbols.OpenComicService]

  constructor(private service: OpenComicService) {}

  execute(filePath: string) {
    return this.service.execute(filePath)
  }
}
