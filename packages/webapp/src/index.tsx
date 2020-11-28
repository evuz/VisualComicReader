import React from 'react'
import ReactDOM from 'react-dom'

import { AppContext } from './app/context/AppContext'
import { App } from './app/app'

ReactDOM.render(
  <AppContext>
    <App />
  </AppContext>,
  document.getElementById('root')
)
