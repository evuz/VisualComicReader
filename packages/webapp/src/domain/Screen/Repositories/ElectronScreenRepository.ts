import { IpcMessages, ProcessMainAdapter } from '@vcr/domain'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ScreenRepository } from './ScreenRepository'

export class ElectronScreenRepository implements ScreenRepository {
  constructor (private electron: ProcessMainAdapter) {}

  toggleFullscreen (): Promise<any> {
    return this.electron.request(IpcMessages.ToggleFullscreen)
  }

  onLoading (): Observable<boolean> {
    return this.electron
      .listen(IpcMessages.Fetching)
      .pipe(map(({ payload }) => payload))
  }
}
