import { FileManagerAdapter, IpcMessages, Library, ProcessMainAdapter } from '@vcr/domain'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LibraryRepository } from './LibraryRepository'

export class ElectronLibraryRepository implements LibraryRepository {
  constructor (private fileManager: FileManagerAdapter, private electron: ProcessMainAdapter) {}

  selectLibrary () {
    return this.fileManager.selectDirectory()
  }

  listenLibraryChanges (): Observable<Library> {
    return this.electron.listen(IpcMessages.Library).pipe(map(({ payload }) => payload))
  }
}
