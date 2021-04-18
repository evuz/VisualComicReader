import { useEffect } from 'react'

import { useDomain } from './useDomain'

export function useRegisterShortchuts (shortcut: string, fn: Function) {
  const domain = useDomain()

  useEffect(() => {
    const observable = domain
      .getListener('registerShortcut')
      .execute(shortcut)
      .subscribe(() => {
        fn()
      })

    return () => observable.unsubscribe()
  }, [domain, fn, shortcut])
}
