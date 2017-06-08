import React from 'react';
import { connect } from 'react-redux';
import {
    HeaderNav,
    LateralNav
} from '../';

const Layout = (props) => {
    return (
        <div className={props.fullScreen ? 'layout full_screen' : 'layout'}>
            <HeaderNav />
            <LateralNav />
            <div className='container'>
                {props.children}
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    const { windowState: {
    fullScreen
  } } = state;
    return {
        fullScreen
    }
}

export default connect(mapStateToProps)(Layout);