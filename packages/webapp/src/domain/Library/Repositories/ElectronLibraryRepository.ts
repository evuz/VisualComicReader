import { FileManagerAdapter, IpcMessages, ProcessMainAdapter } from '@vcr/domain'
import { LibraryRepository } from './LibraryRepository'

export class ElectronLibraryRepository implements LibraryRepository {
  constructor (private fileManager: FileManagerAdapter, private electron: ProcessMainAdapter) {}

  selectLibrary () {
    return this.fileManager.selectDirectory()
  }

  listenLibraryChanges (): any {
    return this.electron.listen(IpcMessages.Library)
  }
}
