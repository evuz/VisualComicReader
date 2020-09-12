import { Observable } from 'rxjs'

export interface ShortcutRepository {
  register(key: string): Observable<void>
}
