import React, { createContext, useState } from 'react'

import { AppDomain } from '../../../domain'
import { factory } from '../../../domain/factory'

type IDomainContext = AppDomain

const defaultValue = null as any

export const DomainContext = createContext<IDomainContext>(defaultValue)

export const DomainState: React.FC = ({ children }) => {
  const [domain] = useState<IDomainContext>(() => factory())

  const context = domain

  return (
    <DomainContext.Provider value={context}>{children}</DomainContext.Provider>
  )
}
