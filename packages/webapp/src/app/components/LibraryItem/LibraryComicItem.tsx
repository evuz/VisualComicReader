import React, { FC } from 'react'
import { ComicLibrary } from '@vcr/domain'

import { BookIcon } from '../Icons/Book.icon'
import { LibraryItem } from './LibraryItem'

type Props = {
  comic: ComicLibrary;
  onClick: (comic: ComicLibrary) => void
};

export const LibraryComicItem: FC<Props> = ({ comic, onClick }) => {
  console.log(comic)

  return (
    <LibraryItem onClick={() => onClick(comic)} title={comic.name} Icon={BookIcon} />

  )
}
