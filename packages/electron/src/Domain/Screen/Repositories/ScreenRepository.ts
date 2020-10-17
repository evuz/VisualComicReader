import { Observable } from 'rxjs'

export interface ScreenRepository {
  toggleFullscreen(): Promise<void>
  onToggleFullscreen: () => Observable<void>
}
