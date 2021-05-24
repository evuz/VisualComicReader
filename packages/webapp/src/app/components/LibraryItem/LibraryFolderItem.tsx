import React, { FC } from 'react'
import { FolderLibrary } from '@vcr/domain'

import { FolderIcon } from '../Icons/Folder.icon'

import { LibraryItem } from './LibraryItem'

type Props = {
  folder: FolderLibrary;
  onClick: (comic: FolderLibrary) => void;
};

export const LibraryFolderItem: FC<Props> = ({ folder, onClick }) => {
  console.log(folder)

  return (
    <LibraryItem
      Icon={FolderIcon}
      title={folder.name}
      onClick={() => onClick(folder)}
    ></LibraryItem>
  )
}
