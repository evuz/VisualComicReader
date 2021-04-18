import { Comic } from '@vcr/domain'
import React, { createContext, useCallback, useState } from 'react'

import { useDomain } from '../../hooks/useDomain'

type IComicState = Comic | null

type IComicContext = {
  comic: IComicState
  selectComic: () => void
  clearComic: () => void
}

const defaultValue: IComicContext = {
  comic: null,
  selectComic: () => {},
  clearComic: () => {}
}
export const ComicContext = createContext<IComicContext>(defaultValue)

export const ComicState: React.FC = ({ children }) => {
  const domain = useDomain()
  const [comic, setComic] = useState<IComicState>(defaultValue.comic)

  const selectComic = useCallback(() => {
    domain
      .getUseCase('selectComic')
      .execute()
      .then((comic) => {
        if (comic) {
          setComic(comic)
        }
      })
  }, [domain])

  const clearComic = useCallback(() => {
    setComic(defaultValue.comic)
  }, [])

  const context: IComicContext = {
    comic,
    selectComic,
    clearComic
  }

  return (
    <ComicContext.Provider value={context}>{children}</ComicContext.Provider>
  )
}
