import { Observable } from 'rxjs'

export interface ShortcutsRepository {
  showInfo: () => Promise<void>
  onShowInfo: () => Observable<void>
  register: () => Promise<void>
}
