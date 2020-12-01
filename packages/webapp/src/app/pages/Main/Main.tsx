import React, { FC, useEffect } from 'react'

import { Button } from '../../components/Button/Button'
import { useComic } from '../../hooks/useComic'
import { useLocation } from '../../hooks/useLocation'

import styles from './Main.module.css'

export const MainPage: FC = () => {
  const { replace } = useLocation()
  const { comic, selectComic, clearComic } = useComic()

  useEffect(() => {
    clearComic()
  }, [clearComic])

  useEffect(() => {
    if (comic) {
      replace('reader')
    }
  }, [comic, replace])

  return (
    <div className={styles.Page}>
      <Button color="ghost" onClick={selectComic}>
        Open Comic
      </Button>
    </div>
  )
}
