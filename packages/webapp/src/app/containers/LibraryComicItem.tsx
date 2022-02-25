import React, { FC, useCallback } from 'react'
import { ComicLibrary } from '@vcr/domain'

import { LibraryComicItem } from '../components/LibraryItem/LibraryComicItem'
import { useComic } from '../hooks/useComic'
import { useLocation } from '../hooks/useLocation'

type Props = {
  comic: ComicLibrary
}

export const LibraryComicItemContainer: FC<Props> = ({ comic }) => {
  const { openComic } = useComic()
  const { push } = useLocation()

  const handleClick = useCallback((value: ComicLibrary) => {
    openComic(value.path).then(() => {
      push('/reader')
    })
  }, [openComic, push])

  return <LibraryComicItem onClick={handleClick} comic={comic}/>
}
