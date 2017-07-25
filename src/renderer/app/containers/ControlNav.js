import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

import { nextPage, previousPage } from '../reducers/reader';
import {
  setFullHeight,
  setFullWidth,
  toogleTwoColumns,
  zoomIn,
  zoomOut,
} from '../reducers/options';

import ControlNavComponent from '../components/ControlNav';

const ControlNavContainer = props => (
  <ControlNavComponent
    {...props}
    onClickOpenFile={() => ipcRenderer.send('open-file')}
    onClickShortcutInfo={() => ipcRenderer.send('show-info-shortcut')}
  />
);

const mapDispatchToProps = {
  onClickNextPage: nextPage,
  onClickPreviousPage: previousPage,
  onClickFullHeight: setFullHeight,
  onClickFullWidth: setFullWidth,
  onClickZoomOut: zoomOut,
  onClickZoomIn: zoomIn,
  onClickChangeColumns: toogleTwoColumns,
};

export default connect(null, mapDispatchToProps)(ControlNavContainer);
