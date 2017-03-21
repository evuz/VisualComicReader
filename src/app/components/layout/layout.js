import React from 'react';
import {
    LateralNav,
    HeaderNav
} from '../';
import { FaAndroid } from 'react-icons/lib/fa';

const Layout = () => (
    <div className='layout'>
        <HeaderNav />
        <LateralNav />
        <div className='container'><FaAndroid /></div>
    </div>
);

export default Layout;