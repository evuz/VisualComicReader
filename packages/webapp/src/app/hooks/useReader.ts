import { useContext } from 'react'

import { ReaderContext } from '../context/Reader/ReaderContext'

export function useControlComic() {
  return useContext(ReaderContext)
}
