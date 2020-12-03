import * as React from 'react'
import type { FC } from 'react'

import styles from './ControlNav.module.css'

export const ControlNav: FC = ({ children }) => (
  <div className={styles.ControlNav}>{children}</div>
)
