import React, { FC } from 'react'

import { LoadingContainer } from './containers/Loading'
import { RegisterShortcuts } from './containers/RegisterShortcuts'
import { Router } from './router'

import './app.css'

export const App: FC = () => {
  return (
    <div className="App">
      <RegisterShortcuts />
      <LoadingContainer />
      <Router />
    </div>
  )
}
