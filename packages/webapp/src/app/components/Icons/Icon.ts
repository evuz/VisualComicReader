import { FC } from 'react'

export type IconProps = {
  size?: number
  width?: number
  height?: number
  color?: string
}

export type Icon = FC<IconProps>

export function generateSizeProperty(
  defaultValue: number,
  size?: number,
  dep?: number
) {
  const value = size || (dep ? null : defaultValue)

  if (value === null) {
    return undefined
  }

  return `${value}rem`
}
