import { useState, useEffect, useCallback } from 'react'
import { BaseLocationHook } from 'wouter'

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
const currentLocation = () => {
  return window.location.hash.replace(/^#/, '') || '/'
}

export const useHashLocation: BaseLocationHook = () => {
  const [loc, setLoc] = useState(currentLocation())
  console.log(loc)
  useEffect(() => {
    // this function is called whenever the hash changes
    const handler = () => setLoc(currentLocation())
    // subscribe to hash changes
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  // remember to wrap your function with `useCallback` hook
  // a tiny but important optimization
  const navigate = useCallback((to: string) => (window.location.hash = to), [])

  return [loc, navigate]
}
