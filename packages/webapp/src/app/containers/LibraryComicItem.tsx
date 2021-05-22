import React, { FC } from 'react'
import { ComicLibrary } from '@vcr/domain'

type Props = {
  comic: ComicLibrary
}

export const LibraryComicItemContainer: FC<Props> = ({ comic }) => {
  console.log(comic)

  return <div>{comic.name}</div>
}
