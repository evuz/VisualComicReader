import React, { FC } from 'react'
import { ComicLibrary } from '@vcr/domain'

type Props = {
  comic: ComicLibrary
}

export const LibraryComicItem: FC<Props> = ({ comic }) => {
  return <LibraryComicItem comic={comic} />
}
