import { useCallback } from 'react'
import { useDomain } from './useDomain'

export function useShortcuts() {
  const domain = useDomain()
  const showShortcuts = useCallback(() => {
    console.log('Show shortcuts is not implemented')
  }, [])

  return { showShortcuts }
}
