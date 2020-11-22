import React, { createContext, useCallback, useState } from 'react'

enum IReaderStateViewMode {
  Width,
  Heigth,
}

enum IReaderStatePageMode {
  Single,
  Dobule,
}

type IReaderState = {
  page: number
  percentSize: number
  viewMode: IReaderStateViewMode
  pageMode: IReaderStatePageMode
}

type IReaderContext = {
  page: IReaderState['page']
  percentSize: IReaderState['percentSize']
  selectPage: (page: number) => void
  nextPage: () => void
  previousPage: () => void
  isFullHeight: () => boolean
  isFullWidth: () => boolean
  isSinglePage: () => boolean
  isDoublePage: () => boolean
}

const defaultValue: IReaderState = {
  page: 0,
  percentSize: 100,
  viewMode: IReaderStateViewMode.Heigth,
  pageMode: IReaderStatePageMode.Single,
}

const defaultContext: IReaderContext = {
  page: defaultValue.page,
  percentSize: defaultValue.percentSize,
  selectPage: () => {},
  nextPage: () => {},
  previousPage: () => {},
  isFullHeight: () => true,
  isFullWidth: () => false,
  isSinglePage: () => true,
  isDoublePage: () => false,
}
export const ReaderContext = createContext<IReaderContext>(defaultContext)

export const ReaderState: React.FC = ({ children }) => {
  const [{ page, percentSize, viewMode, pageMode }, setState] = useState<
    IReaderState
  >(defaultValue)

  const setStateProperty = useCallback(function <T extends keyof IReaderState>(
    key: T,
    update: (prev: IReaderState[T]) => IReaderState[T] | IReaderState[T]
  ) {
    setState((prevState) => {
      const prevProperty = prevState[key]
      const newProperty =
        typeof update === 'function' ? update(prevProperty) : update
      return Object.assign({}, prevState, { [key]: newProperty })
    })
  },
  [])

  const nextPage = useCallback(() => {
    setStateProperty('page', (prev) => prev + 1)
  }, [setStateProperty])

  const previousPage = useCallback(() => {
    setStateProperty('page', (prev) => prev + 1)
  }, [setStateProperty])

  const selectPage = useCallback(
    (newPage) => {
      setStateProperty('page', newPage)
    },
    [setStateProperty]
  )

  const isFullHeight = useCallback(
    () => viewMode === IReaderStateViewMode.Heigth,
    [viewMode]
  )

  const isFullWidth = useCallback(
    () => viewMode === IReaderStateViewMode.Width,
    [viewMode]
  )

  const isSinglePage = useCallback(
    () => pageMode === IReaderStatePageMode.Single,
    [pageMode]
  )

  const isDoublePage = useCallback(
    () => pageMode === IReaderStatePageMode.Dobule,
    [pageMode]
  )

  const context: IReaderContext = {
    page,
    percentSize,
    selectPage,
    nextPage,
    previousPage,
    isFullHeight,
    isFullWidth,
    isSinglePage,
    isDoublePage,
  }

  return (
    <ReaderContext.Provider value={context}>{children}</ReaderContext.Provider>
  )
}
