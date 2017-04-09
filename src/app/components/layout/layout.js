import React from 'react';
import { connect } from 'react-redux';
import {
    HeaderNav,
    LateralNav
} from '../';

const Layout = (props) => {
    return (
        <div className='layout'>
            {
                props.fullScreen ?
                    <div className='container full_screen'>
                        {props.children}
                    </div> :
                    <div>
                        <HeaderNav />
                        <LateralNav />
                        <div className='container'>
                            {props.children}
                        </div>
                    </div>
            }
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