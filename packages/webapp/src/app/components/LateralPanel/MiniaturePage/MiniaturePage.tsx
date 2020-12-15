import React, { FC } from 'react'
import { filterClassNames } from '../../../utils/filterClassNames'

import styles from './MiniaturePage.module.css'

type Props = {
  onClick: (numberPage: number) => void
  numberPage: number
  active: boolean
  page: string
}

export const MiniaturePage: FC<Props> = ({
  onClick,
  numberPage,
  active,
  page,
}) => {
  const className = filterClassNames({
    [styles.Miniature]: true,
    [styles.active]: active,
  })
  return (
    <div
      onClick={() => onClick(numberPage)}
      role="presentation"
      className={className}
    >
      <div className={styles.overlay}>
        <div className={styles.number}>{numberPage + 1}</div>
      </div>
      <img width="100%" src={page} alt="" />
    </div>
  )
}
