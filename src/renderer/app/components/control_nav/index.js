import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { setPage } from '../../reducers/reader';
import {
  setFullHeight,
  setFullWidth,
  setPercentSize,
  setTwoColumns,
} from '../../reducers/options';

import './index.scss';

class HeaderNav extends Component {
  constructor() {
    super();

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.setFullHeight = this.setFullHeight.bind(this);
    this.setFullWidth = this.setFullWidth.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.setTwoColumns = this.setTwoColumns.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('right-press', () => {
      this.nextPage();
    });

    ipcRenderer.on('left-press', () => {
      this.previousPage();
    });

    ipcRenderer.on('ctrl-up-press', () => {
      this.zoomIn();
    });

    ipcRenderer.on('ctrl-down-press', () => {
      this.zoomOut();
    });
  }

  setFullWidth() {
    this.props.setFullWidth();
  }

  setFullHeight() {
    this.props.setFullHeight();
  }

  setTwoColumns() {
    const { twoColumns } = this.props;
    this.props.setTwoColumns(!twoColumns);
  }

  zoomIn() {
    const { percentSize } = this.props;
    this.props.setPercentSize(percentSize + 10);
  }

  zoomOut() {
    const { percentSize } = this.props;
    this.props.setPercentSize(percentSize - 10);
  }

  previousPage() {
    const { page, twoColumns } = this.props;
    if (page === 0) return ipcRenderer.send('previous-file');
    const newPage = twoColumns ? page - 2 : page - 1;
    if (newPage > 0) this.props.setPage(newPage);
    else this.props.setPage(0);
  }

  nextPage() {
    const { page, filesLength, twoColumns } = this.props;
    const newPage = twoColumns ? page + 2 : page + 1;
    if (newPage < filesLength - 1) this.props.setPage(newPage);
    else return ipcRenderer.send('next-file');
  }

  newFile() {
    ipcRenderer.send('open-file');
  }

  showShortcutInfo() {
    ipcRenderer.send('show-info-shortcut');
  }

  render() {
    const { twoColumns } = this.props;
    return (
      <div className="header_nav" >
        <div className="icons">
          <div className="left">
            <MdOpenInBrowser onClick={this.newFile} />
            <MdKeyboard onClick={this.showShortcutInfo} />
          </div>
          <div className="center">
            <MdKeyboardArrowLeft onClick={this.previousPage} />
            <MdKeyboardArrowRight onClick={this.nextPage} />
          </div>
          <div className="right">
            <MdZoomOut onClick={this.zoomIn} />
            <MdZoomIn onClick={this.zoomOut} />
            <MdStayCurrentLandscape onClick={this.setFullWidth} />
            <MdStayCurrentPortrait onClick={this.setFullHeight} />
            {
              twoColumns ?
                <MdLooksOne
                  onClick={this.setTwoColumns}
                /> :
                <MdLooksTwo
                  onClick={this.setTwoColumns}
                />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { reader: {
        page,
    files,
    }, options: {
        percentSize,
      twoColumns,
    } } = state;
  return {
    page,
    filesLength: files.length,
    percentSize,
    twoColumns,
  };
};

const mapDispatchToProps = {
  setPage,
  setFullHeight,
  setFullWidth,
  setPercentSize,
  setTwoColumns,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
