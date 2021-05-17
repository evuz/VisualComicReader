import { useEffect, useRef, useState, RefObject } from 'react'

type IUseIntersectionObserver = {
  distance: string,
  root?: RefObject<Element>
}

export function useIntersectionObserver<T extends HTMLElement> ({ distance, root }: IUseIntersectionObserver) {
  const [show, setShow] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    const rootElement = root?.current
    const observer = new IntersectionObserver((entries) => {
      const el = entries[0]
      setShow(el.isIntersecting)
    }, { rootMargin: distance, root: rootElement })

    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [distance, root])

  return {
    intersectionRef: ref,
    isIntersecting: show
  } as const
}
