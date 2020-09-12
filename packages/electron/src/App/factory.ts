import { App as ElectronApp } from 'electron'

import { DevApp } from './DevApp'
import { ProdApp } from './ProdApp'

export function appFactory(electronApp: ElectronApp) {
  if (process.env.NODE_ENV === 'development') {
    return new DevApp(electronApp)
  }
  return new ProdApp(electronApp)
}
