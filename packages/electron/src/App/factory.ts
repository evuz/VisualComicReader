import { App as ElectronApp } from 'electron'

import { DevApp } from './DevApp'
import { ProdApp } from './ProdApp'
import { domain } from '../Domain'

export function appFactory(electronApp: ElectronApp) {
  if (process.env.NODE_ENV === 'development') {
    return new DevApp(electronApp, domain)
  }
  return new ProdApp(electronApp, domain)
}
