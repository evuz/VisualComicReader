import React, { FC } from 'react'
import { ComicLibrary } from '@vcr/domain'
import { BookIcon } from '../Icons/Book.icon'

type Props = {
  comic: ComicLibrary;
  onClick: (comic: ComicLibrary) => void
};

export const LibraryComicItem: FC<Props> = ({ comic, onClick }) => {
  console.log(comic)

  return (
    <div onClick={() => onClick(comic)} className="Comic">
      <i>
        <BookIcon />
      </i>
      {comic.name}
    </div>
  )
}
