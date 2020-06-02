import React, {ReactNode} from 'react'

import {filterClassNames} from '../../utils/filterClassNames'

import './Button.css'

type Props = {
  children?: ReactNode
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'ghost' | 'success' | 'error' | 'warning'
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit'
  onClick?: (ev: React.MouseEvent) => void
}

export function Button({
  children,
  disabled = false,
  color = 'primary',
  type = 'button',
  onClick = () => {},
  size
}: Props) {
  const colorClass = disabled ? 'Button--disabled' : `Button--${color}`
  const classNames = filterClassNames({
    Button: true,
    [`Button--${size}`]: !!size,
    [colorClass]: true
  })

  function click(ev: React.MouseEvent) {
    if (disabled) {
      return
    }
    onClick(ev)
  }

  return (
    <button
      className={classNames}
      disabled={disabled}
      type={type}
      onClick={click}
    >
      {children}
    </button>
  )
}
