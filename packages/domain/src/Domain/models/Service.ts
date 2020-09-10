import { Observable } from 'rxjs'

import { Entity } from './Entity'
import { Paginated } from './Paginated'

type ServiceReturn = Entity<any> | Entity<any>[] | Paginated<Entity<any>> | void

export interface Service {
  execute(args?: any): Promise<ServiceReturn> | Observable<ServiceReturn>
}
