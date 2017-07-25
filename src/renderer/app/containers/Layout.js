import React from 'react';
import { connect } from 'react-redux';

import LayoutComponent from '../components/Layout';
import ControlNavContainer from './ControlNav';
import LateralPanelContainer from './LateralPanel';

const LayoutContainer = ({ children }) => (
  <LayoutComponent
    controlNav={<ControlNavContainer />}
    lateralPanel={<LateralPanelContainer />}
  >
    {children}
  </LayoutComponent>
);

const mapStateToProps = state => ({
  fullScreen: state.windowState.fullScreen,
});

export default connect(mapStateToProps)(LayoutContainer);
