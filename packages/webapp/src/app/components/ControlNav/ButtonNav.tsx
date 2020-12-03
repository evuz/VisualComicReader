import * as React from 'react'
import type { FC } from 'react'

import styles from './ControlNav.module.css'

type Props = {
  onClick: () => void
}

export const ButtonNav: FC<Props> = ({ children, onClick }) => (
  <button onClick={onClick} className={styles.ButtonNav}>
    {children}
  </button>
)
