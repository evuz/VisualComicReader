import React, { FC } from 'react'

import LayoutComponent from '../components/Layout'
import { useWindowState } from '../hooks/useWindowState'
import { ControlNavContainer } from './ControlNav'
import { LateralPanelContainer } from './LateralPanel'

export const LayoutContainer: FC = ({ children }) => {
  const { windowState } = useWindowState()
  return (
    <LayoutComponent
      controlNav={<ControlNavContainer />}
      lateralPanel={<LateralPanelContainer />}
      fullScreen={windowState.isFullscreen}
    >
      {children}
    </LayoutComponent>
  )
}
