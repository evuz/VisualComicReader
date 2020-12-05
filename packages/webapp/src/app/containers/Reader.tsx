import React, { FC } from 'react'

import { Reader } from '../components/Reader/Reader'
import { useComic } from '../hooks/useComic'
import { useReader } from '../hooks/useReader'
import { useRegisterShortchuts } from '../hooks/useRegisterShortcuts'

export const ReaderContainer: FC = () => {
  const {
    percentSize,
    page,
    isDoublePage,
    isFullHeight,
    isFullWidth,
    nextPage,
    previousPage,
    zoomIn,
    zoomOut,
    setHeightMode,
    setWidthMode,
  } = useReader()
  const { comic } = useComic()

  useRegisterShortchuts('Right', nextPage)
  useRegisterShortchuts('Left', previousPage)
  useRegisterShortchuts('$mod+up', zoomIn)
  useRegisterShortchuts('$mod+down', zoomOut)

  return (
    <Reader
      files={comic?.images}
      page={page}
      twoColumns={isDoublePage()}
      percentSize={percentSize}
      fullHeight={isFullHeight()}
      fullWidth={isFullWidth()}
      onZoomIn={zoomIn}
      onZoomOut={zoomOut}
      onNextPage={nextPage}
      onPreviousPage={previousPage}
      onFullHeight={setHeightMode}
      onFullWidth={setWidthMode}
    />
  )
}
