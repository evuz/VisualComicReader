import { Args, GetConfig, SetConfig } from './types'

export class Domain<T> {
  private useCases: T
  private config: { [e: string]: any }

  constructor({ useCases, config = {} }: Args<T>) {
    this.useCases = useCases
    this.config = config
  }

  setConfig({ key, config }: SetConfig) {
    this.config[key] = config
  }

  getConfig({ key }: GetConfig) {
    if (!this.config[key]) {
      throw Error(`Config ${key} doesn't exist`)
    }
    return this.config[key]
  }

  getUseCase<U extends keyof T>(useCase: U): T[U] {
    if (!this.useCases[useCase]) {
      throw Error(`${useCase} doesn't exist in Domain`)
    }
    return this.useCases[useCase]
  }
}
