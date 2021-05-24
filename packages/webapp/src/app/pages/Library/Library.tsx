import React, { FC, useEffect } from 'react'
import { LibraryItemContainer } from '../../containers/LibraryItem'

import { useLibrary } from '../../hooks/useLibrary'
import { useLocation } from '../../hooks/useLocation'

import './Library.css'

export const LibraryPage: FC = () => {
  const { replace } = useLocation()
  const { hasLibrary, library } = useLibrary()

  useEffect(() => {
    if (!hasLibrary) {
      replace('/')
    }
  }, [hasLibrary, replace])

  return (
    <div className="LibraryPage">
      <div className="LibraryPage--container">
        {library?.map((item) => <LibraryItemContainer key={item.name} item={item} />) }
      </div>
    </div>
  )
}
