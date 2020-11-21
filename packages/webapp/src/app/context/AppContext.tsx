import React, { FC } from 'react'
import { ComicState } from './Comic/ComicContext'

import { DomainState } from './Domain/DomainContext'
import { WindowState } from './WindowState/WindowStateContext'
import { ControlComicState } from './ControlComic/ControlComicContext'

export const AppContext: FC = ({ children }) => {
  return (
    <DomainState>
      <ComicState>
        <ControlComicState>
          <WindowState>{children}</WindowState>
        </ControlComicState>
      </ComicState>
    </DomainState>
  )
}
