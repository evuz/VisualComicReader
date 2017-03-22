import React from 'react';
import {
    LateralNav,
    HeaderNav
} from '../';

const Layout = (props) => (
    <div className='layout'>
        <HeaderNav />
        <LateralNav />
        <div className='container'>
            {props.children}
        </div>
    </div>
);

export default Layout;