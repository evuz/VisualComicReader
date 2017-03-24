import React, { Component } from 'react';
import './app.scss';
import { Layout } from './components';
import { ipcRenderer } from 'electron';

class App extends Component {
  componentDidMount() {
    ipcRenderer.on('file-extracted', event => {
      console.log('file-extracted');
    })
  }

  render() {
    return (
      <Layout />
    );
  }
}

export default App;
