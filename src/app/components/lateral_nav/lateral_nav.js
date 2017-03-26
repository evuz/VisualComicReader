import React, { Component } from 'react';
import { connect } from 'react-redux';
import MiniaturePage from './miniature_page/miniature_page';

class LateralNav extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { files, directory } = this.props;
        const imgShow = files.map((file, index) => {
            return <MiniaturePage src={directory + file} key={index} page={index} />
        })
        return (
            <div className='lateral_nav'>
                {imgShow}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { reader: { directory, files } } = state
    return {
        directory,
        files
    }
}

export default connect(mapStateToProps)(LateralNav);