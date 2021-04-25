import { Library } from '@vcr/domain'
import { Observable } from 'rxjs'

export interface LibraryRepository {
  selectLibrary(): Promise<string | null>
  listenLibraryChanges(): Observable<Library | null>
}
