import React, { FC } from 'react'

import './Loading.css'

type Props = {
  active: boolean
}

export const Loading: FC<Props> = ({ active }) => {
  if (!active) {
    return null
  }

  return (
    <div className="Loading__wrapper">
      <div className="Loading">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
