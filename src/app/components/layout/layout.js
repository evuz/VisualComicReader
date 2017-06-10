import React from 'react';
import { connect } from 'react-redux';
import {
  ControlNav,
  LateralPanel,
} from '../';

const Layout = props => (
  <div className={props.fullScreen ? 'layout full_screen' : 'layout'}>
    <ControlNav />
    <LateralPanel />
    <div className="container">
      {props.children}
    </div>
  </div>
);

const mapStateToProps = state => ({
  fullScreen: state.windowState.fullScreen,
});

export default connect(mapStateToProps)(Layout);
