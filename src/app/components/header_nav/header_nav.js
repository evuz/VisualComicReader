import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../reducers/reader';
import {
    setFullHeight,
    setFullWidth,
    setPercentSize,
    setTwoColumns
} from '../../reducers/options';
import {
    FaFolderOpenO,
    FaAngleLeft,
    FaAngleRight,
    FaArrowsV,
    FaArrowsH,
    FaColumns,
    FaPlus,
    FaMinus
} from 'react-icons/lib/fa'

import { ipcRenderer } from 'electron';

class HeaderNav extends Component {
    constructor() {
        super();

        this.newFile = this.newFile.bind(this);
        this.plusPage = this.plusPage.bind(this);
        this.minusPage = this.minusPage.bind(this);
        this.setFullHeight = this.setFullHeight.bind(this);
        this.setFullWidth = this.setFullWidth.bind(this);
        this.minusZoom = this.minusZoom.bind(this);
        this.plusZoom = this.plusZoom.bind(this);
        this.setTwoColumns = this.setTwoColumns.bind(this);
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

    setFullWidth() {
        this.props.setFullWidth();
    }

    setFullHeight() {
        this.props.setFullHeight();
    }

    plusZoom() {
        const { percentSize } = this.props;
        this.props.setPercentSize(percentSize + 10);
    }

    minusZoom() {
        const { percentSize } = this.props;
        this.props.setPercentSize(percentSize - 10);
    }

    setTwoColumns() {
        const { setTwoColumns, twoColumns } = this.props;
        setTwoColumns(!twoColumns);
    }

    render() {
        const { twoColumns } = this.props;
        return (
            <div className='header_nav'>
                <div className='icons'>
                    <div className='left'>
                        <FaFolderOpenO onClick={this.newFile} />
                    </div>
                    <div className='right'>
                        <FaMinus onClick={this.minusZoom} />
                        <FaPlus onClick={this.plusZoom} />
                        <FaArrowsH onClick={this.setFullWidth} />
                        <FaArrowsV onClick={this.setFullHeight} />
                        <FaColumns
                            onClick={this.setTwoColumns}
                            className={ twoColumns ? 'active' : ''}
                        />
                        <FaAngleLeft onClick={this.minusPage} />
                        <FaAngleRight onClick={this.plusPage} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { reader: {
        page,
        files
    }, options: {
        percentSize,
            twoColumns
    } } = state;
    return {
        page,
        filesLength: files.length,
        percentSize,
        twoColumns
    }
}

const mapDispatchToProps = {
    setPage,
    setFullHeight,
    setFullWidth,
    setPercentSize,
    setTwoColumns
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);