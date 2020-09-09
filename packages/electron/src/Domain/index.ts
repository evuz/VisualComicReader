import { createSingleton } from '@vcr/domain'

import { factory } from './factory'

export const domain = createSingleton(factory)
export type Domain = typeof domain
