import React, { FC } from 'react'

import { LateralPanel } from '../components/LateralPanel/LateralPanel'
import { useReader } from '../hooks/useReader'
import { useComic } from '../hooks/useComic'

export const LateralPanelContainer: FC = () => {
  const { comic } = useComic()
  const { page, selectPage } = useReader()

  return (
    <LateralPanel
      files={comic?.images || []}
      activePage={page}
      onClickPage={selectPage}
    />
  )
}
