import React, { FC } from 'react'

import { Button } from '../../components/Button/Button'
import { useComic } from '../../hooks/useComic'

import styles from './Main.module.css'

export const MainPage: FC = () => {
  const { selectComic } = useComic()

  return (
    <div className={styles.Page}>
      <Button color="ghost" onClick={selectComic}>
        Open Comic
      </Button>
    </div>
  )
}
