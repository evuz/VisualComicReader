import { createSingleton } from '@vcr/domain'

import { factory } from './factory'
import { BrowserWindow } from 'electron'

export type Domain = () => ReturnType<typeof factory>
// TODO: Remove domain variable when it is not used by registerShortcuts function
export let domain: Domain = function () {
  throw Error('You must create domain before')
}

export function createDomain(browserWindow: BrowserWindow) {
  domain = createSingleton(() => factory(browserWindow))
  return domain
}
