import { useContext } from 'react'

import { ComicContext } from '../context/Comic/ComicContext'

export function useComic() {
  return useContext(ComicContext)
}
