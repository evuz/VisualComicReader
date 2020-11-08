import { Service } from '@vcr/domain'
import { ComicRepository } from '../Repositories/ComicRepository'
import { OpenComicService } from './OpenComicService'

export class SelectComicService implements Service {
  constructor(
    private comicRepository: ComicRepository,
    private openComicSrv: OpenComicService
  ) {}

  async execute() {
    const { payload: file } = await this.comicRepository.selectComic()
    const comic = this.openComicSrv.execute(file)
    return comic
  }
}
