import { Observable } from 'rxjs'

export interface ScreenRepository {
  toggleFullscreen(): Promise<void>
  onLoading(): Observable<boolean>
}
