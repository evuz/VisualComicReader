import { Observable } from 'rxjs'

export interface ComicRepository {
  onSelectComic(): Observable<any>
}
