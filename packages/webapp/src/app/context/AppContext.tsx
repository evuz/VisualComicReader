import React, { FC } from 'react'
import { ComicState } from './Comic/ComicContext'

import { DomainState } from './Domain/DomainContext'
import { WindowState } from './WindowState/WindowStateContext'
import { ReaderState } from './Reader/ReaderContext'

export const AppContext: FC = ({ children }) => {
  return (
    <DomainState>
      <ComicState>
        <ReaderState>
          <WindowState>{children}</WindowState>
        </ReaderState>
      </ComicState>
    </DomainState>
  )
}
