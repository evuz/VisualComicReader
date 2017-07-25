import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './containers/Layout';
import Reader from './containers/Reader';
import { setDirectory, setFiles } from './reducers/reader';
import { setFullScreen } from './reducers/windowState';

import './app.scss';

class App extends Component {
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

  render() {
    return (
      <Layout>
        <Reader />
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
