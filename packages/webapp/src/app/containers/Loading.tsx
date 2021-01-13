import React, { FC } from 'react'

import { Loading } from '../components/Loading/Loading'
import { useWindowState } from '../hooks/useWindowState'

export const LoadingContainer: FC = () => {
  const { windowState } = useWindowState()
  return <Loading active={windowState.isFetching} />
}
