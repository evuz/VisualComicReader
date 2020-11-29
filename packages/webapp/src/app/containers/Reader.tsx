import React, { FC } from 'react'

import { Reader } from '../components/Reader/Reader'
import { useComic } from '../hooks/useComic'
import { useControlComic } from '../hooks/useReader'
import { useRegisterShortchuts } from '../hooks/useRegisterShortcuts'

export const ReaderContainer: FC = () => {
  const {
    percentSize,
    isDoublePage,
    isFullHeight,
    isFullWidth,
    page,
    nextPage,
    previousPage,
    zoomIn,
    zoomOut,
  } = useControlComic()
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
    />
  )
}
