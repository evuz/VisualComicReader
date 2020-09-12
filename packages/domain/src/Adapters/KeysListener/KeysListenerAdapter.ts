import { Observable } from 'rxjs'

export interface KeysListenerAdapter {
  /**
   * Register keyboard events
   * @param keys combination of keys to listen.
   * Format is based in {@link https://github.com/jamiebuilds/tinykeys}
   *
   * @example
   * $mod = Cmd(MacOS) / Control(Windows/Linux)
   *
   * "$mod+D" => Cmd+D (MacOs) / Control+D (Windows/Linux)
   */
  register(keys: string): Observable<void>
}
