import React, { createContext, useCallback, useState } from 'react'

type ControlIComicState = number

type IComicContext = {
  pageSelected: ControlIComicState
  nextPage: () => void
  previousPage: () => void
}

const defaultValue: IComicContext = {
  pageSelected: 0,
  nextPage: () => {},
  previousPage: () => {},
}
export const ControlComicContext = createContext<IComicContext>(defaultValue)

export const ControlComicState: React.FC = ({ children }) => {
  const [pageSelected, setPageSelected] = useState<ControlIComicState>(
    defaultValue.pageSelected
  )

  const nextPage = useCallback(() => {
    setPageSelected((prev) => prev + 1)
  }, [])

  const previousPage = useCallback(() => {
    setPageSelected((prev) => prev - 1)
  }, [])

  const context: IComicContext = {
    pageSelected: pageSelected,
    nextPage,
    previousPage,
  }

  return (
    <ControlComicContext.Provider value={context}>
      {children}
    </ControlComicContext.Provider>
  )
}
