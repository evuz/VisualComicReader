import React, { FC, useEffect, useState } from 'react'

import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { useComic } from '../../hooks/useComic'
import { useLocation } from '../../hooks/useLocation'

import styles from './Main.module.css'

export const MainPage: FC = () => {
  const { replace } = useLocation()
  const { comic, selectComic, clearComic } = useComic()
  const [modal, setModal] = useState(false);
  const [md, setMD] = useState<string>('');

  useEffect(() => {
    clearComic()
  }, [clearComic])

  useEffect(() => {
    if (comic) {
      replace('/reader')
    }
  }, [comic, replace])

  useEffect(() => {
    fetch('ShortcutInfo.md').then((res) => res.text()).then(v => {
      console.log(v);
      setMD(v)
    })
  }, [])

  return (
    <div className={styles.Page}>
      <Button color="ghost" onClick={selectComic}>
        Open Comic
      </Button>
      <Button color="ghost" onClick={() => setModal(true)}>
        open modal
      </Button>

      <Modal isOpen={modal} close={() => setModal(false)} body={md} />
    </div>
  )
}
