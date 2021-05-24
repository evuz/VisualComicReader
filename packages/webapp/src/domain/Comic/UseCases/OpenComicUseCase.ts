import { UseCase } from '@vcr/domain'
import { OpenComicService } from '../Services/OpenComicService'

export class OpenComicUseCase implements UseCase {
  constructor (private openComicSrv: OpenComicService) {}

  execute (path: string) {
    return this.openComicSrv.execute(path)
  }
}
