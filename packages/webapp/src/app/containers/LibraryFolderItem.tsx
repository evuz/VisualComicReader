import React, { FC, useCallback } from 'react'
import { FolderLibrary } from '@vcr/domain'

import { LibraryFolderItem } from '../components/LibraryItem/LibraryFolderItem'
import { useLibraryNavigation } from '../hooks/useLibraryNavigation'

type Props = {
  folder: FolderLibrary
}

export const LibraryFolderItemContainer: FC<Props> = ({ folder }) => {
  const { navigate } = useLibraryNavigation()

  const handleClick = useCallback((value: FolderLibrary) => {
    navigate(value)
  }, [navigate])

  return <LibraryFolderItem onClick={handleClick} folder={folder} />
}
