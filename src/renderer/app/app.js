import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './containers/Layout';
import Reader from './containers/Reader';
import LoadingContainer from './containers/Loading';
import { setDirectory, setFiles } from './reducers/reader';
import { setFullScreen, setFetching } from './reducers/windowState';

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

    ipcRenderer.on('fetching', (event, state) => {
      if (!state) {
        setTimeout(() => {
          this.props.setFetching(state);
        }, 2000);
      } else {
        this.props.setFetching(state);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <LoadingContainer />
        <Layout>
          <Reader />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setDirectory,
  setFiles,
  setFullScreen,
  setFetching,
};

export default connect(null, mapDispatchToProps)(App);
