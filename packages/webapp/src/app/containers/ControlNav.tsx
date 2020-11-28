import React, { FC } from 'react'

import ControlNavComponent from '../components/ControlNav'

import { useComic } from '../hooks/useComic'
import { useControlComic } from '../hooks/useReader'
import { useShortcuts } from '../hooks/useShortcuts'

export const ControlNavContainer: FC = () => {
  const { selectComic } = useComic()
  const { showShortcuts } = useShortcuts()
  const {
    previousPage,
    nextPage,
    zoomIn,
    zoomOut,
    setHeigthMode,
    setWidthMode,
    togglePageMode,
    isDoublePage,
  } = useControlComic()

  return (
    <ControlNavComponent
      onClickOpenFile={selectComic}
      onClickShortcutInfo={showShortcuts}
      onClickPreviousPage={previousPage}
      onClickNextPage={nextPage}
      onClickZoomOut={zoomOut}
      onClickZoomIn={zoomIn}
      onClickFullWidth={setWidthMode}
      onClickFullHeight={setHeigthMode}
      onClickChangeColumns={togglePageMode}
      twoColumns={isDoublePage()}
    />
  )
}
