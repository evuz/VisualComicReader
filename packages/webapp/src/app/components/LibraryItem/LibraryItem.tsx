import React, { FC } from 'react'

import { ChevronRightIcon } from '../Icons/ChevronRight.icon'
import type { Icon as IconComponent } from '../Icons/Icon'

import './LibraryItem.css'

type Props = {
  title: string
  Icon: IconComponent
  onClick: () => void
};

export const LibraryItem: FC<Props> = ({ title, onClick, Icon }) => {
  return (
    <div onClick={onClick} className="LibraryItem">
      <i>
        <Icon />
      </i>
      <span className="LibraryItem--title">{title}</span>
      <i>
        <ChevronRightIcon />
      </i>
    </div>
  )
}
