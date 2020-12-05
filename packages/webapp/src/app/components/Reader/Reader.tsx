import React, { FC, useEffect } from 'react'
import { Comic } from '@vcr/domain'

import { useDragScroll } from '../../hooks/useDragScroll'

import styles from './Reader.module.css'
import { filterClassNames } from '../../utils/filterClassNames'
import { BottomBar } from './FloatBar/BottomBar'
import { RightBar } from './FloatBar/RightBar'

export type ReaderProps = {
  files: Comic['images'] | undefined
  page: number
  twoColumns: boolean
  percentSize: number
  fullHeight: boolean
  fullWidth: boolean
  onPreviousPage: () => void
  onNextPage: () => void
  onZoomOut: () => void
  onZoomIn: () => void
  onFullWidth: () => void
  onFullHeight: () => void
}

type ImgSize = {
  fullHeight: boolean
  fullWidth: boolean
  percentSize: number
}

function imgSize({ fullHeight, fullWidth, percentSize }: ImgSize) {
  if (fullHeight) {
    return {
      height: `${percentSize}%`,
      width: 'auto',
    }
  }

  if (fullWidth) {
    return {
      height: 'auto',
      width: `${percentSize}%`,
    }
  }

  return { height: `${percentSize}%` }
}

export const Reader: FC<ReaderProps> = ({
  page,
  files,
  twoColumns,
  fullHeight,
  fullWidth,
  percentSize,
  onPreviousPage,
  onNextPage,
  onFullWidth,
  onFullHeight,
  onZoomOut,
  onZoomIn,
}) => {
  const [readerRef, setReaderRef] = useDragScroll<HTMLDivElement>()
  const { height, width } = imgSize({ fullHeight, fullWidth, percentSize })

  useEffect(() => {
    if (readerRef.current) {
      readerRef.current.scrollTop = 0
      readerRef.current.scrollLeft = 0
    }
  }, [page, readerRef])

  if (!files?.length) {
    return null
  }

  return (
    <div className={styles.Reader} ref={setReaderRef}>
      {twoColumns ? (
        <div
          className={styles['double-page']}
          style={{
            height,
          }}
        >
          <img
            className={filterClassNames([styles['is-left'], styles['is-img']])}
            src={files[page]}
            alt={`Page ${page}`}
            draggable="false"
          />
          <img
            className={filterClassNames([styles['is-right'], styles['is-img']])}
            src={files[page + 1]}
            alt={`Page ${page + 1}`}
            draggable="false"
          />
        </div>
      ) : (
        <img
          className={styles['is-img']}
          src={files[page]}
          alt={`Page ${page}`}
          style={{
            height,
            width,
          }}
          draggable="false"
        />
      )}
      <BottomBar
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onFullWidth={onFullWidth}
        onFullHeight={onFullHeight}
      />
      <RightBar onZoomOut={onZoomOut} onZoomIn={onZoomIn} />
    </div>
  )
}
