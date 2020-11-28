import React, { FC } from 'react'

import LateralPanelComponent from '../components/LateralPanel'
import { useControlComic } from '../hooks/useReader'
import { useComic } from '../hooks/useComic'

export const LateralPanelContainer: FC = () => {
  const { comic } = useComic()
  const { page, selectPage } = useControlComic()

  return (
    <LateralPanelComponent
      files={comic?.images}
      page={page}
      onClickPage={selectPage}
    />
  )
}
