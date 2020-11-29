import React, { FC, useEffect, useState } from 'react'
import { Comic } from '@vcr/domain'

import './index.scss'
import { useDragScroll } from '../../hooks/useDragScroll'

export type ReaderProps = {
  files: Comic['images'] | undefined
  page: number
  twoColumns: boolean
  percentSize: number
  fullHeight: boolean
  fullWidth: boolean
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
}) => {
  const [readerRef, setReaderRef] = useDragScroll<HTMLDivElement>()
  const [clicked] = useState(false)

  const { height, width } = imgSize({ fullHeight, fullWidth, percentSize })

  useEffect(() => {
    if (readerRef.current) {
      readerRef.current.scrollTop = 0
      readerRef.current.scrollLeft = 0
    }
  }, [page, readerRef])

  return files?.length ? (
    <div className="reader" ref={setReaderRef}>
      {twoColumns ? (
        <div
          className="doblePage"
          style={{
            height,
          }}
        >
          <img
            className={clicked ? 'left drag' : 'left'}
            src={files[page]}
            alt=""
          />
          <img
            className={clicked ? 'right drag' : 'right'}
            src={files[page + 1]}
            alt=""
          />
        </div>
      ) : (
        <img
          className={clicked ? 'drag' : ''}
          src={files[page]}
          alt=""
          style={{
            height,
            width,
          }}
          draggable="false"
        />
      )}
    </div>
  ) : null
}
