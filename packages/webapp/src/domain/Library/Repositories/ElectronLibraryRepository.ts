import { FileManagerAdapter, MessageType, Library, MessagesCommunicationAdapter } from '@vcr/domain'
import { from, merge, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { LibraryRepository } from './LibraryRepository'

export class ElectronLibraryRepository implements LibraryRepository {
  constructor (private fileManager: FileManagerAdapter, private electron: MessagesCommunicationAdapter) {}

  selectLibrary () {
    return this.fileManager.selectDirectory()
  }

  listenLibraryChanges (): Observable<Library> {
    const initialLibrary$ = from(this.electron.request(MessageType.Library))
    const library$ = this.electron.listen(MessageType.Library).pipe(filter(({ id }) => !id))
    return merge(initialLibrary$, library$).pipe(map(({ payload }) => payload))
  }
}
