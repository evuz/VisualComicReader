import { FileManagerAdapter, IpcMessages, Library, ProcessMainAdapter } from '@vcr/domain'
import { from, merge, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { LibraryRepository } from './LibraryRepository'

export class ElectronLibraryRepository implements LibraryRepository {
  constructor (private fileManager: FileManagerAdapter, private electron: ProcessMainAdapter) {}

  selectLibrary () {
    return this.fileManager.selectDirectory()
  }

  listenLibraryChanges (): Observable<Library> {
    const initialLibrary$ = from(this.electron.request(IpcMessages.Library))
    const library$ = this.electron.listen(IpcMessages.Library).pipe(filter(({ id }) => !id))
    return merge(initialLibrary$, library$).pipe(map(({ payload }) => payload))
  }
}
