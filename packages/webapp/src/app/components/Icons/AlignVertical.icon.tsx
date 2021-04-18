import * as React from 'react'

import { Icon, generateSizeProperty } from './Icon'

export const AlignVerticalIcon: Icon = ({
  size = 1,
  width,
  height,
  color = 'currentColor'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={generateSizeProperty(size, width, height)}
      height={generateSizeProperty(size, height, width)}
      style={{
        msTransform: 'rotate(360deg)',
        WebkitTransform: 'rotate(360deg)'
      }}
      viewBox="0 0 24 24"
      transform="rotate(360)"
    >
      <path
        d="M13 9v6h3l-4 4l-4-4h3V9H8l4-4l4 4h-3M4 2h16v2H4V2m0 18h16v2H4v-2z"
        fill={color}
      />
    </svg>
  )
}
