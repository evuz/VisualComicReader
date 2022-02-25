import React, { FC, Fragment } from 'react'
import { Route, Router as Wouter } from 'wouter'

import { useHashLocation } from './hooks/useHashLocation'

import { LibraryPage } from './pages/Library/Library'
import { MainPage } from './pages/Main/Main'
import { ReaderPage } from './pages/Reader'

export const Router: FC = () => {
  return (
    <Fragment>
      <Wouter hook={useHashLocation} >
        <Route path="/" component={MainPage} />
        <Route path="/reader" component={ReaderPage} />
        <Route path="/library" component={LibraryPage} />
      </Wouter>
    </Fragment>
  )
}
