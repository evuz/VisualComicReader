import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useDomain } from '../../hooks/useDomain'

type IWindowState = {
  isFetching: boolean
  isFullscreen: boolean
}

type IWindowStateContext = {
  windowState: IWindowState
  toggleFullscreen(): void
}

const defaultValue: IWindowStateContext = {
  windowState: {
    isFetching: false,
    isFullscreen: false,
  },
  toggleFullscreen: () => {},
}

export const WindowStateContext = createContext<IWindowStateContext>(
  defaultValue
)

export const WindowState: React.FC = ({ children }) => {
  const domain = useDomain()
  const [windowState, setWindowState] = useState<IWindowState>(
    defaultValue.windowState
  )

  const toggleFullscreen = useCallback(() => {
    domain
      .getUseCase('toggleFullscreen')
      .execute()
      .then(() => {
        setWindowState(({ isFullscreen, ...prev }) => {
          return Object.assign({}, prev, { isFullscreen: !isFullscreen })
        })
      })
  }, [domain])

  useEffect(() => {
    const subscription = domain
      .getListener('fetching')
      .execute()
      .subscribe((newValue) => {
        setWindowState((prev) =>
          Object.assign({}, prev, { isFetching: newValue })
        )
      })
    return () => subscription.unsubscribe()
  })

  const context: IWindowStateContext = {
    windowState: windowState,
    toggleFullscreen,
  }

  return (
    <WindowStateContext.Provider value={context}>
      {children}
    </WindowStateContext.Provider>
  )
}
