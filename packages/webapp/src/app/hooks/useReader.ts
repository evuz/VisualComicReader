import { useContext } from 'react'

import { ReaderContext } from '../context/Reader/ReaderContext'

export function useReader () {
  return useContext(ReaderContext)
}
