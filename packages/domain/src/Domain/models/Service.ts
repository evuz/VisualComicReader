import { Observable } from 'rxjs'

export interface Service {
  execute(args?: any): Promise<any> | Observable<any>
}
