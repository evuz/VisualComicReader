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

    render() {
        const { files, directory, page } = this.props;
        const imgShow = files.map((file, index) => {
            return <MiniaturePage
                src={directory + file}
                key={index}
                page={index}
                handleClick={this.goToPage}
                active={ page == index }
            />
        })
        return (
            <div className='lateral_nav'>
                {imgShow}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { reader: { directory, files, page } } = state
    return {
        directory,
        files,
        page
    }
}

const mapDispatchToProps = {
    setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(LateralNav);