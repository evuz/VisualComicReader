import React, { createContext, useCallback, useState } from 'react'
import { useComic } from '../../hooks/useComic'

enum IReaderStateViewMode {
  Width,
  Heigth,
}

enum IReaderStatePageMode {
  Single,
  Double,
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
  zoomIn: () => void
  zoomOut: () => void
  isFullHeight: () => boolean
  isFullWidth: () => boolean
  setHeightMode: () => void
  setWidthMode: () => void
  isSinglePage: () => boolean
  isDoublePage: () => boolean
  togglePageMode: () => void
}

const ZOOM_STEP = 10

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
  zoomIn: () => {},
  zoomOut: () => {},
  isFullHeight: () => true,
  isFullWidth: () => false,
  setHeightMode: () => {},
  setWidthMode: () => {},
  isSinglePage: () => true,
  isDoublePage: () => false,
  togglePageMode: () => {},
}
export const ReaderContext = createContext<IReaderContext>(defaultContext)

export const ReaderState: React.FC = ({ children }) => {
  const { comic } = useComic()
  const [{ page, percentSize, viewMode, pageMode }, setState] = useState<
    IReaderState
  >(defaultValue)

  const setStateProperty = useCallback(function <T extends keyof IReaderState>(
    key: T,
    update: ((prev: IReaderState[T]) => IReaderState[T]) | IReaderState[T]
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
    setStateProperty('page', (prev) => {
      if (!comic) {
        return prev
      }
      const lastPage = comic.images.length
      const nextPage = prev + 1
      if (nextPage >= lastPage) {
        return prev
      }
      return nextPage
    })
  }, [setStateProperty, comic])

  const previousPage = useCallback(() => {
    setStateProperty('page', (prev) => {
      if (!comic) {
        return prev
      }
      const previousPage = prev - 1
      if (previousPage < 0) {
        return prev
      }
      return previousPage
    })
  }, [setStateProperty, comic])

  const selectPage = useCallback(
    (newPage) => {
      setStateProperty('page', newPage)
    },
    [setStateProperty]
  )

  const zoomIn = useCallback(() => {
    setStateProperty('percentSize', (prev) => prev + ZOOM_STEP)
  }, [setStateProperty])

  const zoomOut = useCallback(() => {
    setStateProperty('percentSize', (prev) => prev - ZOOM_STEP)
  }, [setStateProperty])

  const isFullHeight = useCallback(
    () => viewMode === IReaderStateViewMode.Heigth,
    [viewMode]
  )

  const isFullWidth = useCallback(
    () => viewMode === IReaderStateViewMode.Width,
    [viewMode]
  )

  const setHeightMode = useCallback(() => {
    setState((prev) =>
      Object.assign({}, prev, {
        viewMode: IReaderStateViewMode.Heigth,
        percentSize: defaultValue.percentSize,
      })
    )
  }, [])

  const setWidthMode = useCallback(() => {
    setState((prev) =>
      Object.assign({}, prev, {
        viewMode: IReaderStateViewMode.Width,
        percentSize: defaultValue.percentSize,
      })
    )
  }, [])

  const isSinglePage = useCallback(
    () => pageMode === IReaderStatePageMode.Single,
    [pageMode]
  )

  const isDoublePage = useCallback(
    () => pageMode === IReaderStatePageMode.Double,
    [pageMode]
  )

  const togglePageMode = useCallback(() => {
    setStateProperty('pageMode', (prev) => {
      switch (prev) {
        case IReaderStatePageMode.Single:
          return IReaderStatePageMode.Double
        default:
          return IReaderStatePageMode.Single
      }
    })
  }, [setStateProperty])

  const context: IReaderContext = {
    page,
    percentSize,
    selectPage,
    nextPage,
    previousPage,
    zoomIn,
    zoomOut,
    isFullHeight,
    isFullWidth,
    setHeightMode,
    setWidthMode,
    isSinglePage,
    isDoublePage,
    togglePageMode,
  }

  return (
    <ReaderContext.Provider value={context}>{children}</ReaderContext.Provider>
  )
}
