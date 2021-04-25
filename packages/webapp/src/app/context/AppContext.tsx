import React, { FC } from 'react'
import { ComicState } from './Comic/ComicContext'

import { DomainState } from './Domain/DomainContext'
import { WindowState } from './WindowState/WindowStateContext'
import { ReaderState } from './Reader/ReaderContext'
import { LibraryState } from './Library/LibraryContext'

export const AppContext: FC = ({ children }) => {
  return (
    <DomainState>
      <ComicState>
        <ReaderState>
          <LibraryState>
            <WindowState>{children}</WindowState>
          </LibraryState>
        </ReaderState>
      </ComicState>
    </DomainState>
  )
}
