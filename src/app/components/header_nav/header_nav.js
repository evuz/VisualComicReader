import React, { Component } from 'react';
import { MdFolderOpen } from 'react-icons/lib/md'

import { ipcRenderer } from 'electron';


class HeaderNav extends Component {
    constructor() {
        super();

        this.newFile = this.newFile.bind(this);
    }

    newFile() {
        ipcRenderer.send('open-file-dialog');
    }

    render() {
        return (
            <div className='header_nav'>
                <div className='iconsLeft'>
                    <MdFolderOpen onClick={this.newFile} />
                </div>
            </div>
        );
    }
}

export default HeaderNav;