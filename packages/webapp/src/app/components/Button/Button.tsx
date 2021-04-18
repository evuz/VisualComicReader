import React, { FC } from 'react'

import { filterClassNames } from '../../utils/filterClassNames'

import './Button.css'

type Props = {
  disabled?: boolean
  color?: 'primary' | 'ghost'
  type?: 'button' | 'submit'
  noBorder?: boolean
  square?: boolean
  rounded?: boolean
  onClick: (ev: React.MouseEvent) => void
}

export const Button: FC<Props> = ({
  children,
  disabled = false,
  color = 'primary',
  type = 'button',
  noBorder = false,
  square = false,
  rounded = false,
  onClick
}) => {
  const colorClass = disabled ? 'is-disabled' : `is-${color}`
  const classNames = filterClassNames({
    Button: true,
    'is-border': !noBorder,
    'is-rounded': rounded,
    'is-square': rounded || square,
    [colorClass]: true
  })

  function click (ev: React.MouseEvent) {
    if (disabled) return

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
