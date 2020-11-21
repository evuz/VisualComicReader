import { useContext } from 'react'

import { ControlComicContext } from '../context/ControlComic/ControlComicContext'

export function useControlComic() {
  return useContext(ControlComicContext)
}
