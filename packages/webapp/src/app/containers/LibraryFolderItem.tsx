import React, { FC } from 'react'
import { FolderLibrary } from '@vcr/domain'

import { LibraryFolderItem } from '../components/LibraryItem/LibraryFolderItem'

type Props = {
  folder: FolderLibrary
}

export const LibraryFolderItemContainer: FC<Props> = ({ folder }) => {
  return <LibraryFolderItem folder={folder}/>
}
