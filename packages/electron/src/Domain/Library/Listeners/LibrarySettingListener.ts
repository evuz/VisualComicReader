import { Listener, Settings } from '@vcr/domain'
import { DEPS_SYMBOL } from 'depsin'
import { distinctUntilChanged, map, tap } from 'rxjs/operators'

import { WatchSettingsListener } from '../../Settings/Listeners/WatchSettingsListener'
import { Symbols } from '../../symbols'

export class LibrarySettingListener implements Listener {
  static [DEPS_SYMBOL] = [Symbols.WatchSettingsListener, Symbols.Settings]

  constructor (
    private watchSettingsListener: WatchSettingsListener,
    private settings: Settings
  ) {}

  execute () {
    return this.watchSettingsListener
      .execute()
      .pipe(
        map(config => config.libraryPath),
        distinctUntilChanged(),
        tap(libraryPath => this.settings.set('libraryPath', libraryPath))
      )
  }
}
