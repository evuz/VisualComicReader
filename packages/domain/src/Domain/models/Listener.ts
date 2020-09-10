import { Observable } from 'rxjs'

export interface Listener {
  execute(args?: any): Observable<any>
}
