import { Observable } from 'rxjs'

export interface ComicRepository {
  selectFile(): Observable<any>
}
