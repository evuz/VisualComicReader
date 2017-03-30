import React, { Component } from 'react';
import { connect } from 'react-redux'

class Reader extends Component {
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
        const { height, width } = twoColumns ? { height: percentSize + '%' } : this.imgSize();

        return files.length ? (
            <div className="reader" >
                {twoColumns ?
                    <div className="doblePage"
                        style={{
                            height
                        }}
                    >
                        <img
                            className="left"
                            src={directory + files[page]}
                            alt=""
                        />
                        <img
                            className="right"
                            src={directory + files[page + 1]}
                            alt=""
                        />
                    </div>
                    : <img
                        src={directory + files[page]}
                        alt=""
                        style={{
                            height: height,
                            width: width
                        }}
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