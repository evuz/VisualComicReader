import { Observable } from 'rxjs'

export interface UseCase {
  execute(args?: any): Promise<any> | Observable<any>
}
