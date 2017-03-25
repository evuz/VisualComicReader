import React from 'react';
import {
    HeaderNav
} from '../';

const Layout = (props) => (
    <div className='layout'>
        <HeaderNav />
        <div className='container'>
            {props.children}
        </div>
    </div>
);

export default Layout;