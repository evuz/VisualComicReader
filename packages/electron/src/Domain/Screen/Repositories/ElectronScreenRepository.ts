import { IpcMessages, ProcessMainAdapter } from '@vcr/domain'
import { inject } from 'depsin'
import { Observable } from 'rxjs'
import { ScreenAdapter } from '../../Adapters/Screen/ScreenAdapter'
import { Symbols } from '../../symbols'
import { ScreenRepository } from './ScreenRepository'

export class ElectronScreenRepository implements ScreenRepository {
  constructor(
    @inject(Symbols.Screen) private screen: ScreenAdapter,
    @inject(Symbols.ProcessMain) private processMain: ProcessMainAdapter
  ) {}

  toggleFullscreen() {
    return Promise.resolve(this.screen.toggleFullscreen())
  }

  onToggleFullscreen(): Observable<any> {
    return this.processMain.listen(IpcMessages.ToggleFullscreen)
  }
}
