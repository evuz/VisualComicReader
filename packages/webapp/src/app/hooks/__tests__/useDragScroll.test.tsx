import React, { FC } from 'react'
import { fireEvent, render } from '@testing-library/react'

import { useDragScroll } from '../useDragScroll'

type Position = { x: number; y: number }
const initialPosition: Position = { x: 0, y: 0 }
function move(target: HTMLElement, delta: Position, init = initialPosition) {
  const { scrollTop: startX, scrollLeft: startY } = target

  fireEvent.mouseDown(target, { clientX: init.x, clientY: init.y })

  fireEvent.mouseMove(target, {
    clientX: startX + delta.x,
    clientY: startY + delta.y,
  })

  fireEvent.mouseUp(target)
}

const Consumer: FC<any> = (props = {}) => {
  const [ref] = useDragScroll()
  return (
    <div style={{ height: '1000px', width: '1000px' }} ref={ref} {...props}>
      Test consumer
      <img data-testid="img" src="" alt="" />
    </div>
  )
}

describe('useDragScroll', () => {
  describe('change styles', () => {
    test('should render consumer', () => {
      const { getByText } = render(<Consumer />)
      const element = getByText(/Test consumer/i)

      expect(element).toBeInTheDocument()
    })

    test('should set default styles', () => {
      const { getByText } = render(<Consumer />)
      const element = getByText(/Test consumer/i)

      expect(element).toHaveStyle({ cursor: 'grab', overflow: 'auto' })
    })

    test('should change cursor style when is dragging', () => {
      const { getByText } = render(<Consumer />)
      const element = getByText(/Test consumer/i)

      fireEvent.mouseDown(element)

      expect(element).toHaveStyle({ cursor: 'grabbing' })
    })

    test('should reset cursor style when you finish dragging', () => {
      const { getByText, getByTestId } = render(<Consumer />)

      const imgElement = getByTestId('img')
      const element = getByText(/Test consumer/i)

      fireEvent.mouseDown(imgElement)

      expect(element).toHaveStyle({ cursor: 'grabbing' })

      fireEvent.mouseUp(imgElement)

      expect(element).toHaveStyle({ cursor: 'grab' })
    })
  })

  describe('move', () => {
    test('should scroll element', () => {
      const { getByText } = render(<Consumer />)
      const element = getByText(/Test consumer/i)

      move(element, { x: 60, y: 30 }, { x: 150, y: 240 })

      expect(element.scrollLeft).toEqual(90)
      expect(element.scrollTop).toEqual(210)
    })
  })
})
