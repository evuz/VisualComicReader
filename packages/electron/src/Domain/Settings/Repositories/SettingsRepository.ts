import { ISettings } from '@vcr/domain'
import { Observable } from 'rxjs'

export class SettingsRepository {
  watchSettings:() => Observable<ISettings>
}
