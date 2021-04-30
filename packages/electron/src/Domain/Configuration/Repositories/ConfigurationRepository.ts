import { IConfiguration } from '@vcr/domain'
import { Observable } from 'rxjs'

export class ConfigurationRepository {
  watchConfiguration:() => Observable<IConfiguration>
}
