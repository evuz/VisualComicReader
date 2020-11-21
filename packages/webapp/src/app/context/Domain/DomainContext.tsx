import React, { createContext, useState } from 'react'

import { domain as appDomain, AppDomain } from '../../../domain'

type IDomainContext = AppDomain

const defaultValue = null as any

export const DomainContext = createContext<IDomainContext>(defaultValue)

export const DomainState: React.FC = ({ children }) => {
  const [domain] = useState<IDomainContext>(appDomain)

  const context = domain

  return (
    <DomainContext.Provider value={context}>{children}</DomainContext.Provider>
  )
}
