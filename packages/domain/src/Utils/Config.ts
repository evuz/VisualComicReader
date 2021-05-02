export class Config<T extends Object> {
  private props: T

  constructor (obj: T) {
    this.props = Object.assign({}, obj)
  }

  get<U extends keyof T> (key: U): T[U] {
    if (!this.props[key]) {
      throw Error(`Config ${key} doesn't exist`)
    }
    return this.props[key]
  }

  set<U extends keyof T> (key: U, value: T[U]): void {
    this.props[key] = value
  }
}
