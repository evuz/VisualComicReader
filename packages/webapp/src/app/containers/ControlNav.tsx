import React, { FC } from 'react'
import { ButtonNav } from '../components/ControlNav/ButtonNav'

import { ControlNav } from '../components/ControlNav/ControlNav'
import { useComic } from '../hooks/useComic'

export const ControlNavContainer: FC = () => {
  const { selectComic } = useComic()

  return (
    <ControlNav>
      <ButtonNav onClick={selectComic}>Open Comic</ButtonNav>
    </ControlNav>
  )
}
