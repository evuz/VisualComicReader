import { useCallback } from 'react'
import { useDomain } from './useDomain'

export function useShortcuts() {
  const domain = useDomain()
  const showShortcuts = useCallback(() => {
    domain.getUseCase('showInfoShortcuts').execute()
  }, [domain])

  return { showShortcuts }
}
