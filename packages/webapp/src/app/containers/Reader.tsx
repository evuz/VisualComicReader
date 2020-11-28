import React, { FC } from 'react'

import ReaderComponent from '../components/Reader'
import { useComic } from '../hooks/useComic'
import { useControlComic } from '../hooks/useReader'
import { useRegisterShortchuts } from '../hooks/useRegisterShortcuts'

export const Reader: FC = () => {
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
    <ReaderComponent
      files={comic?.images}
      page={page}
      twoColumns={isDoublePage()}
      percentSize={percentSize}
      fullHeight={isFullHeight()}
      fullWidth={isFullWidth()}
    />
  )
}
