import React, { FC, Fragment } from 'react'
import { FolderLibrary } from '@vcr/domain'

import { useComic } from '../../hooks/useComic'

import { ButtonNav } from '../../components/ControlNav/ButtonNav'
import { ControlNav } from '../../components/ControlNav/ControlNav'
import { useLibraryNavigation } from '../../hooks/useLibraryNavigation'
import { ChevronRightIcon } from '../../components/Icons/ChevronRight.icon'

type BreadcrumbProps = {
  stack: FolderLibrary[]
  onClick: (folder: FolderLibrary | null) => void
}
const MAX_BREADCRUM = 4

const Breadcrumb: FC<BreadcrumbProps> = ({ stack, onClick }) => {
  const stackVisible = stack.slice(-MAX_BREADCRUM)

  const items = stackVisible.map((folder) => {
    return (
      <Fragment key={folder.name}>
        <ChevronRightIcon />
        <ButtonNav onClick={() => onClick(folder)}>{folder.name}</ButtonNav>
      </Fragment>
    )
  })
  return (
    <div className="LibraryControlNav__breadcrumb">
      <ButtonNav onClick={() => onClick(null)}>/</ButtonNav>
      {items}
    </div>
  )
}

export const LibraryControlNav: FC = () => {
  const { selectComic } = useComic()
  const { stack, navigate } = useLibraryNavigation()

  return (
    <ControlNav>
      <div className="LibraryControlNav">
        <ButtonNav onClick={selectComic}>Open Comic</ButtonNav>
        <Breadcrumb onClick={navigate} stack={stack} />
        <span></span>
      </div>
    </ControlNav>
  )
}
