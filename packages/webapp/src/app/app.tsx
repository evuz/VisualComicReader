import React, { FC } from 'react'

import { LayoutContainer } from './containers/Layout'
import { Reader } from './containers/Reader'
import { LoadingContainer } from './containers/Loading'
import { RegisterShortcuts } from './containers/RegisterShortcuts'

import './app.scss'

export const App: FC = () => {
  return (
    <div className="App">
      <RegisterShortcuts />
      <LoadingContainer />
      <LayoutContainer>
        <Reader />
      </LayoutContainer>
    </div>
  )
}
