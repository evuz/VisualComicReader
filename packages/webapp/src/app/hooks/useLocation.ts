import { useCallback } from 'react'

import { useLocation as useWouterLocation } from 'wouter'

export function useLocation() {
  const [location, setLocation] = useWouterLocation()

  const push = useCallback((to: string) => setLocation(to), [setLocation])
  const replace = useCallback(
    (to: string) => setLocation(to, { replace: true }),
    [setLocation]
  )

  return { location, push, replace }
}
