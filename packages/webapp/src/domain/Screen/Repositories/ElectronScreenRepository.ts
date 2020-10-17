import { IpcMessages, ProcessMainAdapter } from '@vcr/domain'
import { ScreenRepository } from './ScreenRepository'

export class ElectronScreenRepository implements ScreenRepository {
  constructor(private electron: ProcessMainAdapter) {}

  toggleFullscreen(): Promise<any> {
    return this.electron.request(IpcMessages.ToggleFullscreen)
  }
}
