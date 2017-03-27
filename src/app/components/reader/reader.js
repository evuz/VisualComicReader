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
        const { height, width } = this.imgSize();

        const imgShow = files.map((file, index) => {
            return <img
                key={index}
                src={directory + file}
                alt=""
                style={{
                    height: height,
                    width: width
                }}
            />
        });
        return (
            <div className="reader" >
                {imgShow[page]}
            </div>
        );
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