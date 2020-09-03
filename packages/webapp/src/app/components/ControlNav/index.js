import React from 'react'
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
} from 'react-icons/md'

import './index.scss'

const HeaderNav = (props) => (
  <div className="header_nav">
    <div className="icons">
      <div className="left">
        <MdOpenInBrowser onClick={props.onClickOpenFile} />
        <MdKeyboard onClick={props.onClickShortcutInfo} />
      </div>
      <div className="center">
        <MdKeyboardArrowLeft onClick={props.onClickPreviousPage} />
        <MdKeyboardArrowRight onClick={props.onClickNextPage} />
      </div>
      <div className="right">
        <MdZoomOut onClick={props.onClickZoomOut} />
        <MdZoomIn onClick={props.onClickZoomIn} />
        <MdStayCurrentLandscape onClick={props.onClickFullWidth} />
        <MdStayCurrentPortrait onClick={props.onClickFullHeight} />
        {props.twoColumns ? (
          <MdLooksOne onClick={props.onClickChangeColumns} />
        ) : (
          <MdLooksTwo onClick={props.onClickChangeColumns} />
        )}
      </div>
    </div>
  </div>
)

export default HeaderNav
