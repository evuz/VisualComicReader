import { Config } from '../../Utils/Config'

export type ISettings = {
  libraryPath?: string
}

export type Settings = Config<ISettings>

export const defaultSettings: ISettings = {
  libraryPath: undefined
}
