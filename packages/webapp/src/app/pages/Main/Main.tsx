import React, { FC, useEffect } from 'react'

import { Button } from '../../components/Button/Button'
import { useComic } from '../../hooks/useComic'
import { useLibrary } from '../../hooks/useLibrary'
import { useLocation } from '../../hooks/useLocation'

import './Main.css'

export const MainPage: FC = () => {
  const { replace } = useLocation()
  const { comic, selectComic, clearComic } = useComic()
  const { selectLibrary } = useLibrary()

  useEffect(() => {
    clearComic()
  }, [clearComic])

  useEffect(() => {
    if (comic) {
      replace('/reader')
    }
  }, [comic, replace])

  return (
    <div className="Page">
      <Button color="ghost" onClick={selectComic}>
        Open Comic
      </Button>
      <Button onClick={selectLibrary}>
        Select Library
      </Button>
    </div>
  )
}
