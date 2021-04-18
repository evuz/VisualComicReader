import React, { FC, useEffect, useRef } from 'react'

import { MiniaturePage } from './MiniaturePage/MiniaturePage'

import './LateralPanel.css'

type Props = {
  files: string[]
  onClickPage: (page: number) => void
  activePage: number
}

export const LateralPanel: FC<Props> = ({ files, onClickPage, activePage }) => {
  const ref = useRef<HTMLDivElement>(null)

  // TODO: extract to a hook
  useEffect(() => {
    const element = ref.current?.children[activePage] as HTMLElement
    if (!element) {
      return element
    }

    function showElement ([entry]: IntersectionObserverEntry[]) {
      if (!ref.current || entry.isIntersecting) {
        return
      }

      const block = element.offsetTop < ref.current.scrollTop ? 'start' : 'end'
      element?.scrollIntoView({ behavior: 'smooth', block })
    }

    const observer = new IntersectionObserver(showElement, { rootMargin: '-100px' })
    observer.observe(element)

    return () => observer.disconnect()
  }, [activePage])

  const miniatures = (files || []).map((file, index) => (
    <MiniaturePage
      page={file}
      key={index}
      numberPage={index}
      onClick={onClickPage}
      active={activePage === index}
    />
  ))

  return (
    <div className="LateralPanel" ref={ref}>
      {miniatures}
    </div>
  )
}
