import React, { FC, Fragment } from 'react'

import { useComic } from '../hooks/useComic'
import { useRegisterShortchuts } from '../hooks/useRegisterShortcuts'
import { useWindowState } from '../hooks/useWindowState'

export const RegisterShortcuts: FC = ({ children }) => {
  const { selectComic } = useComic()
  const { toggleFullscreen } = useWindowState()

  useRegisterShortchuts('$mod+o', selectComic)
  useRegisterShortchuts('$mod+f', toggleFullscreen)

  return <Fragment>{children}</Fragment>
}
