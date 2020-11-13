import React, { Component } from 'react'
import { connect } from 'react-redux'

import { nextPage, previousPage, setFiles } from '../reducers/reader'
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

    this.selectComic = this.selectComic.bind(this)
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

  selectComic() {
    domain
      .getUseCase('selectComic')
      .execute()
      .then((comic) => {
        this.props.setFiles(comic.images)
      })
  }

  render() {
    return (
      <ControlNavComponent
        {...this.props}
        onClickOpenFile={this.selectComic}
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
  setFiles: setFiles,
}

export default connect(null, mapDispatchToProps)(ControlNavContainer)
