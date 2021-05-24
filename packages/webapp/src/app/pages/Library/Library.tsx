import React, { FC, useEffect, useMemo } from 'react'
import { LibraryItemContainer } from '../../containers/LibraryItem'

import { useLibrary } from '../../hooks/useLibrary'
import { useLibraryNavigation } from '../../hooks/useLibraryNavigation'
import { useLocation } from '../../hooks/useLocation'

import './Library.css'

export const LibraryPage: FC = () => {
  const { replace } = useLocation()
  const { hasLibrary } = useLibrary()
  const { library } = useLibraryNavigation()

  useEffect(() => {
    if (!hasLibrary) {
      replace('/')
    }
  }, [hasLibrary, replace])

  const librarySorted = useMemo(
    () => library?.slice().sort().sort((a, b) => a.type - b.type),
    [library]
  )

  return (
    <div className="LibraryPage">
      <div className="LibraryPage--container">
        {librarySorted?.map((item) => <LibraryItemContainer key={item.name} item={item} />) }
      </div>
    </div>
  )
}
