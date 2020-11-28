import { useCallback } from 'react'

export function useShortcuts() {
  const showShortcuts = useCallback(() => {
    // TODO: show shortcuts
  }, [])

  return { showShortcuts }
}
