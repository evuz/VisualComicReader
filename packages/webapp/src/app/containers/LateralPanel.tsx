import React, { FC } from 'react'

import LateralPanelComponent from '../components/LateralPanel'
import { useReader } from '../hooks/useReader'
import { useComic } from '../hooks/useComic'

export const LateralPanelContainer: FC = () => {
  const { comic } = useComic()
  const { page, selectPage } = useReader()

  return (
    <LateralPanelComponent
      files={comic?.images}
      page={page}
      onClickPage={selectPage}
    />
  )
}
