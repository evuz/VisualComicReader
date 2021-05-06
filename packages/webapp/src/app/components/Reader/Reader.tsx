import React, { FC, useEffect } from 'react'
import { Comic } from '@vcr/domain'

import { useDragScroll } from '../../hooks/useDragScroll'

import { filterClassNames } from '../../utils/filterClassNames'
import { BottomBar } from './FloatBar/BottomBar'
import { RightBar } from './FloatBar/RightBar'

import './Reader.css'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { isScrollable } from '../../utils/isScrollable'

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

function imgSize ({ fullHeight, fullWidth, percentSize }: ImgSize) {
  if (fullHeight) {
    return {
      height: `${percentSize}%`,
      width: 'auto'
    }
  }

  if (fullWidth) {
    return {
      height: 'auto',
      width: `${percentSize}%`
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
  onZoomIn
}) => {
  const [readerRef, setReaderRef] = useDragScroll<HTMLDivElement>()
  const { intersectionRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    distance: '0px',
    root: readerRef
  })

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

  const readerClassnames = filterClassNames({
    Reader: true,
    'Reader--centered': isIntersecting && !(isScrollable(readerRef.current))
  })
  return (
    <div className={readerClassnames} ref={setReaderRef}>
      {twoColumns
        ? (
        <div
          className={'Reader__double-page'}
          style={{
            height
          }}
        >
          <img
            className={filterClassNames(['Reader__left', 'Reader__img'])}
            src={files[page]}
            alt={`Page ${page}`}
            draggable="false"
          />
          <img
            className={filterClassNames(['Reader__right', 'Reader__img'])}
            src={files[page + 1]}
            alt={`Page ${page + 1}`}
            draggable="false"
          />
        </div>
          )
        : (
        <img
          className={'Reader__img'}
          src={files[page]}
          alt={`Page ${page}`}
          style={{
            height,
            width
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
      <div ref={intersectionRef}/>
    </div>
  )
}
