import React, { FC } from 'react'
import { FolderLibrary } from '@vcr/domain'

type Props = {
  folder: FolderLibrary
}

export const LibraryFolderItem: FC<Props> = ({ folder }) => {
  console.log(folder)

  return <div>{folder.name}</div>
}
