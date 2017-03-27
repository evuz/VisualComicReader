import React from 'react';
import {
    HeaderNav,
    LateralNav
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