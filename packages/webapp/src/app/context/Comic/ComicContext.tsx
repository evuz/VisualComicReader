import { Comic } from '@vcr/domain'
import React, { createContext, useCallback, useState } from 'react'

import { useDomain } from '../../hooks/useDomain'
import { useLocation } from '../../hooks/useLocation'

type IComicState = Comic | null

type IComicContext = {
  comic: IComicState
  selectComic: () => void
}

const defaultValue: IComicContext = {
  comic: null,
  selectComic: () => {},
}
export const ComicContext = createContext<IComicContext>(defaultValue)

export const ComicState: React.FC = ({ children }) => {
  const domain = useDomain()
  const { replace } = useLocation()
  const [comic, setComic] = useState<IComicState>(defaultValue.comic)

  const selectComic = useCallback(() => {
    domain
      .getUseCase('selectComic')
      .execute()
      .then((comic) => {
        replace('reader')
        setComic(comic)
      })
  }, [domain, replace])

  const context: IComicContext = {
    comic,
    selectComic,
  }

  return (
    <ComicContext.Provider value={context}>{children}</ComicContext.Provider>
  )
}
