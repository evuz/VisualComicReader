import React, { FC, Fragment } from 'react'
import { useComic } from '../hooks/useComic'
import { useRegisterShortchuts } from '../hooks/useRegisterShortcuts'
import { useShortcuts } from '../hooks/useShortcuts'
import { useWindowState } from '../hooks/useWindowState'

export const RegisterShortcuts: FC = ({ children }) => {
  const { selectComic } = useComic()
  const { toggleFullscreen } = useWindowState()
  const { showShortcuts } = useShortcuts()

  useRegisterShortchuts('$mod+o', selectComic)
  useRegisterShortchuts('$mod+f', toggleFullscreen)
  useRegisterShortchuts('$mod+s', showShortcuts)

  return <Fragment>{children}</Fragment>
}
