import React, { FC, Fragment } from 'react'
import { Route } from 'wouter'

import { MainPage } from './pages/Main/Main'
import { ReaderPage } from './pages/Reader'

export const Router: FC = () => {
  return (
    <Fragment>
      <Route path="/" component={MainPage} />
      <Route path="/reader" component={ReaderPage} />
    </Fragment>
  )
}
