import { Config } from '@vcr/domain'

export type IConfiguration = {
  platform: typeof process.platform
  paths: {
    tmp: string
    app: string
    config: string
  }
}

export type Configuration = Config<IConfiguration>
