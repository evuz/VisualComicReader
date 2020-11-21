import { useContext } from 'react'

import { WindowStateContext } from '../context/WindowState/WindowStateContext'

export function useDomain() {
  return useContext(WindowStateContext)
}
