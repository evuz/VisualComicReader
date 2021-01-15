import * as React from 'react'
import type { FC } from 'react'

import { ChevronLeftIcon } from '../../Icons/ChevronLeft.icon'
import { ChevronRightIcon } from '../../Icons/ChevronRight.icon'
import { AlignHorizontalIcon } from '../../Icons/AlignHorizontal.icon'
import { AlignVerticalIcon } from '../../Icons/AlignVertical.icon'
import { filterClassNames } from '../../../utils/filterClassNames'
import { ButtonBar } from './ButtonBar'

import './FloatBar.css'

type Props = {
  onPreviousPage: () => void
  onNextPage: () => void
  onFullWidth: () => void
  onFullHeight: () => void
}

export const BottomBar: FC<Props> = ({
  onPreviousPage,
  onNextPage,
  onFullWidth,
  onFullHeight,
}) => {
  return (
    <nav className={filterClassNames(['BottomBar', 'FloatBar'])}>
      <div className={filterClassNames(['BottomBar__container', 'FloatBar__row'])}>
        <ButtonBar onClick={onPreviousPage}>
          <ChevronLeftIcon size={2} />
        </ButtonBar>
        <ButtonBar onClick={onFullHeight}>
          <AlignVerticalIcon size={2} />
        </ButtonBar>
        <ButtonBar onClick={onFullWidth}>
          <AlignHorizontalIcon size={2} />
        </ButtonBar>
        <ButtonBar onClick={onNextPage}>
          <ChevronRightIcon size={2} />
        </ButtonBar>
      </div>
    </nav>
  )
}
