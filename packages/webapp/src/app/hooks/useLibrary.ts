import { useContext } from 'react'

import { LibraryContext } from '../context/Library/LibraryContext'

export function useLibrary () {
  return useContext(LibraryContext)
}
