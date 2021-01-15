import * as React from 'react'
import type { FC } from 'react'

import './ControlNav.css'

type Props = {
  onClick: () => void
}

export const ButtonNav: FC<Props> = ({ children, onClick }) => (
  <button onClick={onClick} className='ControlNav__button-nav'>
    {children}
  </button>
)
