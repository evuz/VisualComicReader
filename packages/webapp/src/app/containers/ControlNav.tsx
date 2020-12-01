import React, { FC } from 'react'

import ControlNavComponent from '../components/ControlNav'

import { useComic } from '../hooks/useComic'
import { useReader } from '../hooks/useReader'

export const ControlNavContainer: FC = () => {
  const { selectComic } = useComic()
  const { showShortcuts } = useShortcuts()
  const {
    previousPage,
    nextPage,
    zoomIn,
    zoomOut,
    setHeightMode,
    setWidthMode,
    togglePageMode,
    isDoublePage,
  } = useReader()

  return (
    <ControlNavComponent
      onClickOpenFile={selectComic}
      onClickShortcutInfo={showShortcuts}
      onClickPreviousPage={previousPage}
      onClickNextPage={nextPage}
      onClickZoomOut={zoomOut}
      onClickZoomIn={zoomIn}
      onClickFullWidth={setWidthMode}
      onClickFullHeight={setHeightMode}
      onClickChangeColumns={togglePageMode}
      twoColumns={isDoublePage()}
    />
  )
}
