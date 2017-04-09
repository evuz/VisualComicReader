import React, { Component } from 'react';
import { connect } from 'react-redux';
import './app.scss';

import { Layout, Reader } from './components';
import { ipcRenderer } from 'electron';
import { setDirectory, setFiles } from './reducers/reader';
import { setFullScreen } from './reducers/windowState';

class App extends Component {
  constructor() {
    super();
    this.state = {
      workingDirectory: '',
      files: []
    }
  }

  componentDidMount() {
    ipcRenderer.on('file-extracted', (event, data) => {
      this.props.setDirectory(data.tmpFolder + '/');
      this.props.setFiles(data.files);
    });

    ipcRenderer.on('enter-full-screen', () => {
      this.props.setFullScreen(true);
    })

    ipcRenderer.on('leave-full-screen', () => {
      this.props.setFullScreen(false);
    })

    ipcRenderer.on('ctrl-up-press', () => {
      console.log('ctrl-up-press');
    })

    ipcRenderer.on('ctrl-down-press', () => {
      console.log('ctrl-down-press');
    })
  }

  filterFiles(files) {
    const error = -1;
    files = files.filter(file => {
      return file.indexOf('.jpg') > error || file.indexOf('.png') > error;
    })

    return files;
  }

  render() {
    return (
      <Layout>
        <Reader
          dir={this.state.workingDirectory}
          files={this.state.files}
        />
      </Layout>
    );
  }
}

const mapDispatchToProps = {
  setDirectory,
  setFiles,
  setFullScreen
}

export default connect(null, mapDispatchToProps)(App);
