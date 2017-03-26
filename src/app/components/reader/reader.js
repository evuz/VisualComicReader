import React, { Component } from 'react';
import { connect } from 'react-redux'

class Reader extends Component {
    render() {
        const {reader: {files, directory, page}} = this.props;
        const imgShow = files.map((file, index) => {
            return <img key={index} src={directory + file} alt=""/>
        })
        return (
            <div className="reader">
                { imgShow[page] }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { reader } = state
    return { 
        reader 
    }
}

export default connect(mapStateToProps)(Reader);