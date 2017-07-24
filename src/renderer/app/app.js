import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './components/layout';
import Reader from './components/reader';
import { setDirectory, setFiles } from './reducers/reader';
import { setFullScreen } from './reducers/windowState';

import './app.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      workingDirectory: '',
      files: [],
    };
  }

  componentDidMount() {
    ipcRenderer.on('file-extracted', (event, data) => {
      this.props.setDirectory(`${data.tmpFolder}/`);
      this.props.setFiles(data.files);
    });

    ipcRenderer.on('enter-full-screen', () => {
      this.props.setFullScreen(true);
    });

    ipcRenderer.on('leave-full-screen', () => {
      this.props.setFullScreen(false);
    });
  }

  filterFiles(files) {
    const error = -1;
    const filesFilter = files.filter(file => (file.indexOf('.jpg') > error || file.indexOf('.png') > error));

    return filesFilter;
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
  setFullScreen,
};

export default connect(null, mapDispatchToProps)(App);
