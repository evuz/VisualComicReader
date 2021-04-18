import * as React from 'react'

import { Icon, generateSizeProperty } from './Icon'

export const ZoomInIcon: Icon = ({
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
      <g
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={11} cy={11} r={8} />
        <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
      </g>
    </svg>
  )
}
