import React, { Component } from 'react';
import { connect } from 'react-redux';

class Reader extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            cursorY: 0,
            cursorX: 0
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { reader } = this.refs;
        const prevPage = prevProps.reader.page;
        const newPage = this.props.reader.page;

        if (reader && prevPage !== newPage) {
            reader.scrollTop = 0;
        }
    }

    handleMouseUp() {
        this.setState({
            clicked: false
        })
    }

    handleMouseDown(e) {
        this.setState({
            clicked: true,
            cursorX: e.pageX,
            cursorY: e.pageY
        })
    }

    handleMouseMove(e) {
        const { clicked, cursorX, cursorY } = this.state;
        if (clicked) {
            let { reader } = this.refs;
            const { pageX, pageY } = e;
            reader.scrollLeft -= -cursorX + pageX;
            reader.scrollTop -= -cursorY + pageY;
            this.setState({
                cursorX: pageX,
                cursorY: pageY
            })
        }
    }

    imgSize() {
        const {
            fullHeight,
            fullWidth,
            percentSize
        } = this.props.options;
        if (fullHeight) {
            return {
                height: percentSize + '%',
                width: 'auto'
            }
        } else if (fullWidth) {
            return {
                height: 'auto',
                width: percentSize + '%'
            }
        }
    }

    render() {
        const { files, directory, page } = this.props.reader;
        const { twoColumns, percentSize } = this.props.options;
        const { clicked } = this.state;
        const { height, width } = twoColumns ? { height: percentSize + '%' } : this.imgSize();

        return files.length ? (
            <div
                className="reader"
                ref="reader"
            >
                {twoColumns ?
                    <div className="doblePage"
                        style={{
                            height
                        }}
                    >
                        <img
                            className={clicked ? 'left drag' : 'left'}
                            src={directory + files[page]}
                            alt=""
                            draggable="false"
                            onMouseDown={this.handleMouseDown}
                            onMouseUp={this.handleMouseUp}
                            onMouseMove={this.handleMouseMove}
                        />
                        <img
                            className={clicked ? 'right drag' : 'right'}
                            src={directory + files[page + 1]}
                            alt=""
                            draggable="false"
                            onMouseDown={this.handleMouseDown}
                            onMouseUp={this.handleMouseUp}
                            onMouseMove={this.handleMouseMove}
                        />
                    </div>
                    : <img
                        className={clicked ? 'drag' : ''}
                        src={directory + files[page]}
                        alt=""
                        style={{
                            height: height,
                            width: width
                        }}
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        onMouseMove={this.handleMouseMove}
                        draggable="false"
                    />
                }
            </div>
        ) : null;
    }
}

const mapStateToProps = state => {
    const { reader, options } = state
    return {
        reader,
        options
    }
}

export default connect(mapStateToProps)(Reader);