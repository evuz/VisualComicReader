import React, { Component } from 'react';

import MiniaturePage from './MiniaturePage';

import './index.scss';

class LateralNav extends Component {
  scrollPosition() {
    const { lateralNav } = this;
    if (lateralNav) {
      const { page, files } = this.props;
      const { scrollHeight } = lateralNav;
      const filesLength = files.length;

      const imageHeight = scrollHeight / filesLength;

      lateralNav.scrollTop = imageHeight * (page - 2);
    }
  }

  render() {
    const { files, directory, page } = this.props;
    this.scrollPosition();

    const imgShow = files.map((file, index) => (<MiniaturePage
      src={directory + file}
      key={index}
      page={index}
      handleClick={this.props.onClickPage}
      active={page === index}
    />));
    return (
      <div className="lateral_nav" ref={c => (this.lateralNav = c)}>
        {imgShow}
      </div>
    );
  }
}


export default LateralNav;
