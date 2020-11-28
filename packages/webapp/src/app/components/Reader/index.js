import React, { Component } from 'react'

import './index.scss'

class Reader extends Component {
  constructor() {
    super()
    this.state = {
      clicked: false,
      cursorY: 0,
      cursorX: 0,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { reader } = this
    const prevPage = prevProps.page
    const newPage = this.props.page

    if (reader && prevPage !== newPage) {
      reader.scrollTop = 0
    }
  }

  handleMouseUp() {
    this.setState({
      clicked: false,
    })
  }

  handleMouseDown(e) {
    this.setState({
      clicked: true,
      cursorX: e.pageX,
      cursorY: e.pageY,
    })
  }

  handleMouseMove(e) {
    const { clicked, cursorX, cursorY } = this.state
    if (clicked) {
      const { reader } = this
      const { pageX, pageY } = e
      reader.scrollLeft -= -cursorX + pageX
      reader.scrollTop -= -cursorY + pageY
      this.setState({
        cursorX: pageX,
        cursorY: pageY,
      })
    }
  }

  imgSize() {
    const { fullHeight, fullWidth, percentSize } = this.props
    if (fullHeight) {
      return {
        height: `${percentSize}%`,
        width: 'auto',
      }
    } else if (fullWidth) {
      return {
        height: 'auto',
        width: `${percentSize}%`,
      }
    }
  }

  render() {
    const { files, page, twoColumns, percentSize } = this.props
    const { height, width } = twoColumns
      ? { height: `${percentSize}%` }
      : this.imgSize()
    const { clicked } = this.state

    return files?.length ? (
      <div className="reader" ref={(c) => (this.reader = c)}>
        {twoColumns ? (
          <div
            className="doblePage"
            style={{
              height,
            }}
          >
            <img
              className={clicked ? 'left drag' : 'left'}
              src={files[page]}
              alt=""
              draggable="false"
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              onMouseMove={this.handleMouseMove}
            />
            <img
              className={clicked ? 'right drag' : 'right'}
              src={files[page + 1]}
              alt=""
              draggable="false"
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              onMouseMove={this.handleMouseMove}
            />
          </div>
        ) : (
          <img
            className={clicked ? 'drag' : ''}
            src={files[page]}
            alt=""
            style={{
              height,
              width,
            }}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            draggable="false"
          />
        )}
      </div>
    ) : null
  }
}

export default Reader
