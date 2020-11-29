import { useCallback, useEffect, useRef } from 'react'

export type State = {
  clicked: boolean
  cursorX: number
  cursorY: number
}

const defaultState: State = {
  clicked: false,
  cursorX: 0,
  cursorY: 0,
}

export function useDragScroll<T extends HTMLElement = HTMLElement>() {
  const targetRef = useRef<T | null>(null)
  const stateRef = useRef<State>(defaultState)

  const mouseDown = useCallback((event: MouseEvent) => {
    if (!targetRef.current) return

    targetRef.current.style.cursor = 'grabbing'

    stateRef.current.clicked = true
    stateRef.current.cursorX = event.pageX || event.clientX
    stateRef.current.cursorY = event.pageY || event.clientY
  }, [])

  const mouseMove = useCallback((event: MouseEvent) => {
    if (!targetRef.current) return
    if (!stateRef.current.clicked) return

    const pageX = event.pageX || event.clientX
    const pageY = event.pageY || event.clientY

    targetRef.current.scrollLeft -= -stateRef.current.cursorX + pageX
    targetRef.current.scrollTop -= -stateRef.current.cursorY + pageY

    stateRef.current.cursorX = pageX
    stateRef.current.cursorY = pageY
  }, [])

  const mouseUp = useCallback(() => {
    if (!targetRef.current) return

    targetRef.current.style.cursor = 'grab'

    stateRef.current.clicked = false
  }, [])

  const setTarget = useCallback(
    (node: T | null) => {
      targetRef.current = node

      stateRef.current.clicked = false
      stateRef.current.cursorX = 0
      stateRef.current.cursorY = 0

      if (!targetRef.current) {
        return
      }

      targetRef.current.removeEventListener('mousedown', mouseDown)
      targetRef.current.removeEventListener('mouseup', mouseUp)
      targetRef.current.removeEventListener('mousemove', mouseMove)

      targetRef.current.style.cursor = 'grab'
      targetRef.current.style.overflow = 'auto'

      targetRef.current.addEventListener('mousedown', mouseDown)
      targetRef.current.addEventListener('mouseup', mouseUp)
      targetRef.current.addEventListener('mousemove', mouseMove)
    },
    [mouseDown, mouseMove, mouseUp]
  )

  useEffect(() => {
    setTarget(targetRef.current)

    return () => {
      if (!targetRef.current) return
      targetRef.current.removeEventListener('mousedown', mouseDown)
      targetRef.current.removeEventListener('mouseup', mouseUp)
      targetRef.current.removeEventListener('mousemove', mouseMove)
    }
  }, [mouseDown, mouseMove, mouseUp, setTarget])

  return [targetRef, setTarget] as const
}
