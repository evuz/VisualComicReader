import React, { FC } from 'react'

import LoadingComponent from '../components/Loading'
import { useWindowState } from '../hooks/useWindowState'

export const LoadingContainer: FC = () => {
  const { windowState } = useWindowState()
  return <LoadingComponent state={windowState.isFetching} />
}
