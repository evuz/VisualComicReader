import React from 'react';

import LateralPanel from '../LateralPanel';
import ControlNav from '../ControlNav';

import './index.scss';

const Layout = props => (
  <div className={props.fullScreen ? 'layout full_screen' : 'layout'}>
    <ControlNav />
    <LateralPanel />
    <div className="container">
      {props.children}
    </div>
  </div>
);

export default Layout;
