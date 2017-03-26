import React, { Component } from 'react';

class MiniaturePage extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {handleClick, page} = this.props;
        handleClick(page);
    }

    render() {
        const { page, src, active } = this.props;
        return (
            <div
            onClick={this.handleClick}
            className={ active ? 'active miniature-page' : 'miniature-page'}
            >
                <img src={src} alt='' />
                <span className='number-page'>{page + 1}</span>
            </div>
        );
    }
}

export default MiniaturePage;