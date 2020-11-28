import { useContext } from 'react'

import { WindowStateContext } from '../context/WindowState/WindowStateContext'

export function useWindowState() {
  return useContext(WindowStateContext)
}
