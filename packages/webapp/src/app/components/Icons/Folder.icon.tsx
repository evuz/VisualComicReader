import * as React from 'react'

import { Icon, generateSizeProperty } from './Icon'

export const FolderIcon: Icon = ({
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
        d="M20 5h-8.586L9.707 3.293A.997.997 0 009 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"
        fill={color}
      />
    </svg>
  )
}
