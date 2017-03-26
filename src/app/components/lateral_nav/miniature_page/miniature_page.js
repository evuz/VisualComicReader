import React from 'react';

const MiniaturePage = (props) => (
    <div className="miniature-page">
        <img src={props.src} alt=""/>
        <span className="number-page">{props.page + 1}</span>
    </div>
);

export default MiniaturePage;