import React, { FC } from 'react'

import styles from './Loading.module.css'

type Props = {
  active: boolean
}

export const Loading: FC<Props> = ({ active }) => {
  if (!active) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.Loading}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
