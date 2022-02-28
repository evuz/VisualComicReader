import { MessageType, MessagesCommunicationAdapter } from '@vcr/domain'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ScreenRepository } from './ScreenRepository'

export class ElectronScreenRepository implements ScreenRepository {
  constructor (private electron: MessagesCommunicationAdapter) {}

  toggleFullscreen (): Promise<any> {
    return this.electron.request(MessageType.ToggleFullscreen)
  }

  onLoading (): Observable<boolean> {
    return this.electron
      .listen(MessageType.Fetching)
      .pipe(map(({ payload }) => payload))
  }
}
