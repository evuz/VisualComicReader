import * as React from 'react'
import type { FC } from 'react'
import { Button } from '../../Button/Button'

type Props = {
  onClick: () => void
  rounded?: boolean
}

export const ButtonBar: FC<Props> = ({ onClick, children, rounded }) => {
  return (
    <Button rounded={rounded} square noBorder color="ghost" onClick={onClick}>
      {children}
    </Button>
  )
}
