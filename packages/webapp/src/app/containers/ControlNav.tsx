import React, { FC } from 'react'
import { ButtonNav } from '../components/ControlNav/ButtonNav'

import { ControlNav } from '../components/ControlNav/ControlNav'
import { useComic } from '../hooks/useComic'
import { useLibrary } from '../hooks/useLibrary'
import { useLocation } from '../hooks/useLocation'

export const ControlNavContainer: FC = () => {
  const { selectComic } = useComic()
  const { hasLibrary } = useLibrary()
  const { push } = useLocation()

  const goLibrary = () => {
    push('/library')
  }

  return (
    <ControlNav>
      { hasLibrary && <ButtonNav onClick={goLibrary}>Library</ButtonNav>}
      <ButtonNav onClick={selectComic}>Open Comic</ButtonNav>
    </ControlNav>
  )
}
