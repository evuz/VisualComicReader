import { Service, FileManagerAdapter } from '@vcr/domain'
import { OpenComicService } from './OpenComicService'

export class SelectComicService implements Service {
  constructor(
    private fileManager: FileManagerAdapter,
    private openComicSrv: OpenComicService
  ) {}

  async execute() {
    const file = await this.fileManager.selectFile(['cbz', 'cbr'])
    const comic = this.openComicSrv.execute(file)
    return comic
  }
}
