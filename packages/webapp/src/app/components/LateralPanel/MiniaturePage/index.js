import React, { Component } from 'react';

import './index.scss';

class MiniaturePage extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleClick, page } = this.props;
    handleClick(page);
  }

  render() {
    const { page, src, active } = this.props;
    return (
      <div
        onClick={this.handleClick}
        role="presentation"
        className={active ? 'active miniature-page' : 'miniature-page'}
      >
        <div className="hover-page">
          <div className="number-page">{page + 1}</div>
        </div>
        <img src={src} alt="" />
      </div>
    );
  }
}

export default MiniaturePage;
