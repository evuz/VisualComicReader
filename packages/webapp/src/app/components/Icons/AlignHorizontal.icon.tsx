import * as React from 'react'

import { Icon, generateSizeProperty } from './Icon'

export const AlignHorizontalIcon: Icon = ({
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
        d="M9 11h6V8l4 4-4 4v-3H9v3l-4-4 4-4v3m-7 9V4h2v16H2m18 0V4h2v16h-2z"
        fill={color}
      />
    </svg>
  )
}
