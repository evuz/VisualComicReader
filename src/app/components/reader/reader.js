import React, { Component } from 'react';

class Reader extends Component {
    render() {
        const {files, dir} = this.props;
        const imgShow = files.map((file, index) => {
            return <img key={index} src={dir + file} alt=""/>
        })
        return (
            <div className="reader">
                { imgShow }
            </div>
        );
    }
}

export default Reader;