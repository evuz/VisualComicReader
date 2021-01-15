import React, { FC, useEffect } from 'react'

import { Layout } from '../components/Layout/Layout'
import { ControlNavContainer } from '../containers/ControlNav'
import { LateralPanelContainer } from '../containers/LateralPanel'
import { ReaderContainer } from '../containers/Reader'
import { useComic } from '../hooks/useComic'
import { useLocation } from '../hooks/useLocation'
import { useWindowState } from '../hooks/useWindowState'

export const ReaderPage: FC = () => {
  const { windowState } = useWindowState()
  const { replace } = useLocation()
  const { comic } = useComic()

  useEffect(() => {
    if (!comic) {
      replace('/')
    }
  }, [comic, replace])

  return (
    <Layout
      controlNav={<ControlNavContainer />}
      lateralPanel={<LateralPanelContainer />}
      fullScreen={windowState.isFullscreen}
    >
      <ReaderContainer />
    </Layout>
  )
}
