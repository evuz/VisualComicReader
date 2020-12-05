import * as React from 'react'
import type { FC } from 'react'
import { filterClassNames } from '../../../utils/filterClassNames'

import styles from './FloatBar.module.css'
import { ButtonBar } from './ButtonBar'
import { ZoomInIcon } from '../../Icons/ZoomIn.icon'
import { ZoomOutIcon } from '../../Icons/ZoomOut.icon'

type Props = {
  onZoomOut: () => void
  onZoomIn: () => void
}

export const RightBar: FC<Props> = ({ onZoomOut, onZoomIn }) => {
  return (
    <nav className={filterClassNames([styles.RightBar, styles.FloatBar])}>
      <div className={styles.container}>
        <ButtonBar rounded onClick={onZoomIn}>
          <ZoomInIcon size={1.5} />
        </ButtonBar>
        <ButtonBar rounded onClick={onZoomOut}>
          <ZoomOutIcon size={1.5} />
        </ButtonBar>
      </div>
    </nav>
  )
}
