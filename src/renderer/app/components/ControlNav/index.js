import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import {
  MdOpenInBrowser,
  MdKeyboard,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdStayCurrentPortrait,
  MdStayCurrentLandscape,
  MdLooksTwo,
  MdLooksOne,
  MdZoomIn,
  MdZoomOut,
} from 'react-icons/lib/md';

import './index.scss';

class HeaderNav extends Component {
  componentDidMount() {
    ipcRenderer.on('right-press', () => {
      this.props.onClickNextPage();
    });

    ipcRenderer.on('left-press', () => {
      this.props.onClickPreviousPage();
    });

    ipcRenderer.on('ctrl-up-press', () => {
      this.props.onClickZoomIn();
    });

    ipcRenderer.on('ctrl-down-press', () => {
      this.props.onClickZoomOut();
    });
  }

  render() {
    const { twoColumns } = this.props;
    return (
      <div className="header_nav" >
        <div className="icons">
          <div className="left">
            <MdOpenInBrowser onClick={this.props.onClickOpenFile} />
            <MdKeyboard onClick={this.props.onClickShortcutInfo} />
          </div>
          <div className="center">
            <MdKeyboardArrowLeft onClick={this.props.onClickPreviousPage} />
            <MdKeyboardArrowRight onClick={this.props.onClickNextPage} />
          </div>
          <div className="right">
            <MdZoomOut onClick={this.props.onClickZoomOut} />
            <MdZoomIn onClick={this.props.onClickZoomIn} />
            <MdStayCurrentLandscape onClick={this.props.onClickFullWidth} />
            <MdStayCurrentPortrait onClick={this.props.onClickFullHeight} />
            {
              twoColumns ?
                <MdLooksOne
                  onClick={this.props.onClickChangeColumns}
                /> :
                <MdLooksTwo
                  onClick={this.props.onClickChangeColumns}
                />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderNav;
