import { Observable } from 'rxjs'

export type IMessageOptions = {
  type: 'none' | 'info' | 'error' | 'question' | 'warning'
  title: string
  message: string
}

export interface ShortcutsRepository {
  showInfo: (message: IMessageOptions) => Promise<void>
  onShowInfo: () => Observable<void>
  register: () => Promise<void>
}
