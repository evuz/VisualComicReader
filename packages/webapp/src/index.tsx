import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './app/configureStore'

import { AppContext } from './app/context/AppContext'
import App from './app/app'

const store = configureStore()

ReactDOM.render(
  <AppContext>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContext>,
  document.getElementById('root')
)
