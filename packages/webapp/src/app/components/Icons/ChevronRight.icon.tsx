import * as React from 'react'

import { Icon, generateSizeProperty } from './Icon'

export const ChevronRightIcon: Icon = ({
  size = 1,
  width,
  height,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={generateSizeProperty(size, width, height)}
      height={generateSizeProperty(size, height, width)}
      style={{
        msTransform: 'rotate(360deg)',
        WebkitTransform: 'rotate(360deg)',
      }}
      viewBox="0 0 24 24"
      transform="rotate(360)"
    >
      <path
        d="M9 18l6-6-6-6"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
