import { BehaviorSubject } from 'rxjs'

export class Config<T extends Object> {
  private props$: BehaviorSubject<T>

  get obs$ () {
    return this.props$.asObservable()
  }

  constructor (obj: T) {
    this.props$ = new BehaviorSubject(obj)
  }

  get (): T
  get<U extends keyof T> (key: U): T[U]
  get<U extends keyof T> (key?: U): any {
    const props = this.props$.value

    if (!key) {
      return Object.assign({}, props)
    }

    if (!{}.hasOwnProperty.call(props, key)) {
      throw Error(`Config ${key} doesn't exist`)
    }
    return props[key]
  }

  set (value: T): void
  set<U extends keyof T> (key: U, value: T[U]): void
  set<U extends keyof T> (valueOrKey: T | U, value?: T[U]): void {
    if (typeof valueOrKey === 'object') {
      this.props$.next(valueOrKey as T)
      return null
    }

    const props = this.props$.value
    const key = valueOrKey as U

    props[key] = value
    this.props$.next(props)
  }
}
