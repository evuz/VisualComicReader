import { Args, GetConfig, SetConfig } from './types'

export class Domain<T, K> {
  private useCases: T
  private listeners: K
  private config: { [e: string]: any }

  constructor ({ useCases, listeners, config = {} }: Args<T, K>) {
    this.useCases = useCases
    this.listeners = listeners
    this.config = config
  }

  setConfig ({ key, config }: SetConfig) {
    this.config[key] = config
  }

  getConfig ({ key }: GetConfig) {
    if (!this.config[key]) {
      throw Error(`Config ${key} doesn't exist`)
    }
    return this.config[key]
  }

  getUseCase<U extends keyof T> (useCase: U): T[U] {
    return this.get(this.useCases, useCase)
  }

  getListener<U extends keyof K> (listener: U): K[U] {
    return this.get(this.listeners, listener)
  }

  private get<U, V extends keyof U> (obj: U, key: V) {
    if (!obj[key]) {
      throw Error(`${key} doesn't exist in Domain`)
    }
    return obj[key]
  }
}
