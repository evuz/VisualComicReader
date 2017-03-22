import React, { Component } from 'react';
import { MdFolderOpen } from 'react-icons/lib/md'

const ipc = require('electron').ipcRenderer


class HeaderNav extends Component {
    render() {
        return (
            <div className='header_nav'>
                <div className='iconsLeft'>
                    <MdFolderOpen onClick={this.newFile}/>
                </div>
            </div>
        );
    }
}

export default HeaderNav;