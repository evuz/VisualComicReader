import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../reducers/reader';
import MiniaturePage from './miniature_page/miniature_page';

class LateralNav extends Component {
  constructor(props) {
    super(props);

    this.goToPage = this.goToPage.bind(this);
  }

  goToPage(index) {
    this.props.setPage(index);
  }

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
      handleClick={this.goToPage}
      active={page === index}
    />));
    return (
      <div className="lateral_nav" ref={c => (this.lateralNav = c)}>
        {imgShow}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { reader: { directory, files, page } } = state;
  return {
    directory,
    files,
    page,
  };
};

const mapDispatchToProps = {
  setPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LateralNav);
