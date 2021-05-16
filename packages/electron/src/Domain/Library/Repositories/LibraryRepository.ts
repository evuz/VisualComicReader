import { Library } from '@vcr/domain'
import { Observable } from 'rxjs'

export interface LibraryRepository {
  watchLibrary: () => Observable<void>
  readLibrary: () => Promise<Library>
}
