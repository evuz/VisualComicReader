import {
  FileManagerAdapter,
  IpcMessages,
  Path,
  ProcessMainAdapter,
  Service,
} from '@vcr/domain'
import { inject } from 'depsin'
import { Symbols } from '../../symbols'

export class OpenComicService implements Service {
  constructor(
    @inject(Symbols.FileManager) private fileManager: FileManagerAdapter,
    @inject(Symbols.ProcessMain) private processMain: ProcessMainAdapter
  ) {}

  async execute(path: Path) {
    this.processMain.emit(IpcMessages.Fetching, { payload: true })
    const file = await this.fileManager.openFile(path)
    this.processMain.emit(IpcMessages.Fetching, { payload: false })
    return file
  }
}
