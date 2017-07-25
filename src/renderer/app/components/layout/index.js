import React from 'react';

import './index.scss';

const Layout = ({ children, lateralPanel, controlNav, fullScreen }) => (
  <div className={fullScreen ? 'layout full_screen' : 'layout'}>
    {controlNav}
    {lateralPanel}
    <div className="container">
      {children}
    </div>
  </div>
);

export default Layout;
