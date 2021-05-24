import React, { FC } from 'react'
import { FolderLibrary } from '@vcr/domain'
import { FolderIcon } from '../Icons/Folder.icon'

type Props = {
  folder: FolderLibrary;
};

export const LibraryFolderItem: FC<Props> = ({ folder }) => {
  console.log(folder)

  return (
    <div className="Folder">
      <i>
        <FolderIcon />
      </i>
      {folder.name}
    </div>
  )
}
