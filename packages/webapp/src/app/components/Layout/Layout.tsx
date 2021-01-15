import React, { FC } from 'react'

import './Layout.css'

type Props = {
  lateralPanel: React.ReactNode
  controlNav: React.ReactNode
  fullScreen: boolean
}

export const Layout: FC<Props> = ({
  children,
  lateralPanel,
  controlNav,
  fullScreen,
}) => (
  <div className={fullScreen ? 'Layout__fullscreen' : 'Layout'}>
    {controlNav}
    {lateralPanel}
    <div className="Layout__container">{children}</div>
  </div>
)
