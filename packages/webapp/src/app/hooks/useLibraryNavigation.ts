import { useContext } from 'react'

import { LibraryNavigationContext } from '../context/Library/LibraryNavigationContext'

export function useLibraryNavigation () {
  return useContext(LibraryNavigationContext)
}
