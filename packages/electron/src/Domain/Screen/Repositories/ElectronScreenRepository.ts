import { IpcMessages, ProcessMainAdapter } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { Observable } from 'rxjs'
import { ScreenAdapter } from '../../Adapters/Screen/ScreenAdapter'
import { Symbols } from '../../symbols'
import { ScreenRepository } from './ScreenRepository'

export class ElectronScreenRepository implements ScreenRepository {
  static [DEPS_SYMBOL] = [Symbols.Screen, Symbols.ProcessMain]

  constructor(
    private screen: ScreenAdapter,
    private processMain: ProcessMainAdapter
  ) {}

  toggleFullscreen() {
    return Promise.resolve(this.screen.toggleFullscreen())
  }

  onToggleFullscreen(): Observable<any> {
    return this.processMain.listen(IpcMessages.ToggleFullscreen)
  }
}
