import React, { Component } from 'react'
import { connect } from 'react-redux'

import { nextPage, previousPage } from '../reducers/reader'
import {
  setFullHeight,
  setFullWidth,
  toogleTwoColumns,
  zoomIn,
  zoomOut,
} from '../reducers/options'

import ControlNavComponent from '../components/ControlNav'
import { domain } from '../../domain'

class ControlNavContainer extends Component {
  constructor(props) {
    super(props)

    this.ipcRenderer = window.require
      ? window.require('electron').ipcRenderer
      : null
  }

  componentDidMount() {
    this.ipcRenderer.on('right-press', () => {
      this.props.onClickNextPage()
    })

    this.ipcRenderer.on('left-press', () => {
      this.props.onClickPreviousPage()
    })

    this.ipcRenderer.on('ctrl-up-press', () => {
      this.props.onClickZoomIn()
    })

    this.ipcRenderer.on('ctrl-down-press', () => {
      this.props.onClickZoomOut()
    })
  }

  render() {
    return (
      <ControlNavComponent
        {...this.props}
        onClickOpenFile={() => domain.getUseCase('selectComic').execute()}
        onClickShortcutInfo={() => this.ipcRenderer.send('show-info-shortcut')}
      />
    )
  }
}

const mapDispatchToProps = {
  onClickNextPage: nextPage,
  onClickPreviousPage: previousPage,
  onClickFullHeight: setFullHeight,
  onClickFullWidth: setFullWidth,
  onClickZoomOut: zoomOut,
  onClickZoomIn: zoomIn,
  onClickChangeColumns: toogleTwoColumns,
}

export default connect(null, mapDispatchToProps)(ControlNavContainer)
