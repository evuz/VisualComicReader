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
    domain
      .getListener('registerShortcut')
      .execute('Right')
      .subscribe(() => {
        this.props.onClickNextPage()
      })

    domain
      .getListener('registerShortcut')
      .execute('Left')
      .subscribe(() => {
        this.props.onClickPreviousPage()
      })

    domain
      .getListener('registerShortcut')
      .execute('$mod+Up')
      .subscribe(() => {
        this.props.onClickZoomIn()
      })

    domain
      .getListener('registerShortcut')
      .execute('$mod+Down')
      .subscribe(() => {
        this.props.onClickZoomOut()
      })

    domain
      .getListener('registerShortcut')
      .execute('$mod+S')
      .subscribe(() => {
        this.ipcRenderer.send('show-info-shortcut')
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
