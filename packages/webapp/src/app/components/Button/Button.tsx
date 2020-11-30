import React, { FC } from 'react'

import { filterClassNames } from '../../utils/filterClassNames'

import styles from './Button.module.css'

type Props = {
  disabled?: boolean
  color?: 'primary' | 'ghost'
  type?: 'button' | 'submit'
  onClick: (ev: React.MouseEvent) => void
}

export const Button: FC<Props> = ({
  children,
  disabled = false,
  color = 'primary',
  type = 'button',
  onClick,
}) => {
  const colorClass = disabled ? styles['is-disabled'] : styles[`is-${color}`]
  const classNames = filterClassNames({
    [styles.Button]: true,
    [colorClass]: true,
  })

  function click(ev: React.MouseEvent) {
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
