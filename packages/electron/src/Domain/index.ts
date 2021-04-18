import { createSingleton } from '@vcr/domain'

import { factory } from './factory'
import { BrowserWindow } from 'electron'

export type Domain = () => ReturnType<typeof factory>

export function createDomain (browserWindow: BrowserWindow) {
  return createSingleton(() => factory(browserWindow))
}
