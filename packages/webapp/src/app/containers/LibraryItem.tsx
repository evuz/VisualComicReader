import React, { FC } from 'react'
import { ComicLibrary, FileLibrary, FolderLibrary } from '@vcr/domain'

import { LibraryComicItemContainer } from './LibraryComicItem'
import { LibraryFolderItemContainer } from './LibraryFolderItem'

type Props = {
  item: ComicLibrary | FolderLibrary
}

export const LibraryItemContainer: FC<Props> = ({ item }) => {
  switch (item.type) {
    case FileLibrary.Comic:
      return <LibraryComicItemContainer comic={item as ComicLibrary} />
    case FileLibrary.Folder:
      return <LibraryFolderItemContainer folder={item as FolderLibrary} />
    default:
      throw Error('LibraryItem type not supported')
  }
}
