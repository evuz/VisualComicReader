import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../reducers/reader';
import { FaFolderOpenO, FaAngleLeft, FaAngleRight } from 'react-icons/lib/fa'

import { ipcRenderer } from 'electron';

class HeaderNav extends Component {
    constructor() {
        super();

        this.newFile = this.newFile.bind(this);
        this.plusPage = this.plusPage.bind(this);
        this.minusPage = this.minusPage.bind(this);
    }

    newFile() {
        ipcRenderer.send('open-file');
    }

    plusPage() {
        const { page, setPage, filesLength } = this.props;
        if (page < filesLength - 1) setPage(page + 1);
    }

    minusPage() {
        const { page, setPage } = this.props;
        if (page > 0) setPage(page - 1);
    }

    render() {
        return (
            <div className='header_nav'>
                <div className='icons'>
                    <div className='left'>
                        <FaFolderOpenO onClick={this.newFile} />
                    </div>
                    <div className='right'>
                        <FaAngleLeft onClick={this.minusPage} />
                        <FaAngleRight onClick={this.plusPage} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { reader: { page, files } } = state;
    return {
        page,
        filesLength: files.length
    }
}

const mapDispatchToProps = {
    setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);