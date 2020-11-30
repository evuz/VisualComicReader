import React, { FC } from 'react'

import LayoutComponent from '../components/Layout'
import { ControlNavContainer } from '../containers/ControlNav'
import { LateralPanelContainer } from '../containers/LateralPanel'
import { ReaderContainer } from '../containers/Reader'
import { useWindowState } from '../hooks/useWindowState'

export const ReaderPage: FC = () => {
  const { windowState } = useWindowState()
  return (
    <LayoutComponent
      controlNav={<ControlNavContainer />}
      lateralPanel={<LateralPanelContainer />}
      fullScreen={windowState.isFullscreen}
    >
      <ReaderContainer />
    </LayoutComponent>
  )
}
