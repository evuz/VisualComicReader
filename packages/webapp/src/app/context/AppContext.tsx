import React, { FC } from 'react'
import { ComicState } from './Comic/ComicContext'

import { DomainState } from './Domain/DomainContext'
import { WindowState } from './WindowState/WindowStateContext'
import { ReaderState } from './Reader/ReaderContext'
import { LibraryState } from './Library/LibraryContext'
import { LibraryNavigationState } from './Library/LibraryNavigationContext'

export const AppContext: FC = ({ children }) => {
  return (
    <DomainState>
      <ComicState>
        <ReaderState>
          <LibraryState>
            <LibraryNavigationState>
              <WindowState>{children}</WindowState>
            </LibraryNavigationState>
          </LibraryState>
        </ReaderState>
      </ComicState>
    </DomainState>
  )
}
