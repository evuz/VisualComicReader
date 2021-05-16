import { Listener, Settings } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { distinctUntilChanged, map } from 'rxjs/operators'

import { Symbols } from '../../symbols'

export class LibrarySettingListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.Settings]

  constructor (
    private settings: Settings
  ) {}

  execute () {
    return this.settings.obs$
      .pipe(
        map(config => config.libraryPath),
        distinctUntilChanged()
      )
  }
}
