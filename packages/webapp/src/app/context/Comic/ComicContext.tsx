import { Comic } from '@vcr/domain'
import React, { createContext, useCallback, useState } from 'react'

import { useDomain } from '../../hooks/useDomain'

type IComicState = Comic | null

type IComicContext = {
  comic: IComicState
  openComic: (comicPath: string) => Promise<void>
  selectComic: () => void
  clearComic: () => void
}

const defaultValue: IComicContext = {
  comic: null,
  openComic: () => Promise.resolve(),
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

  const openComic = useCallback((path) => {
    return domain.getUseCase('openComic').execute(path).then(comic => {
      console.log(comic)
      setComic(comic)
    })
  }, [domain])

  const clearComic = useCallback(() => {
    setComic(defaultValue.comic)
  }, [])

  const context: IComicContext = {
    comic,
    openComic,
    selectComic,
    clearComic
  }

  return (
    <ComicContext.Provider value={context}>{children}</ComicContext.Provider>
  )
}
