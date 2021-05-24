import React, { FC, useCallback } from 'react'
import { FolderLibrary } from '@vcr/domain'

import { LibraryFolderItem } from '../components/LibraryItem/LibraryFolderItem'

type Props = {
  folder: FolderLibrary
}

export const LibraryFolderItemContainer: FC<Props> = ({ folder }) => {
  const handleClick = useCallback((value: FolderLibrary) => {
    console.log(value)
  }, [])

  return <LibraryFolderItem onClick={handleClick} folder={folder} />
}
