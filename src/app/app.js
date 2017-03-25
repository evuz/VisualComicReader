import React, { Component } from 'react';
import './app.scss';
import { Layout, Reader } from './components';
import { ipcRenderer } from 'electron';

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
      this.setState({
        workingDirectory: data.tmpFolder + '/'
      });
      event.sender.send('read-directory', this.state.workingDirectory);
    });

    ipcRenderer.on('list-files', (event, data) => {
      this.setState({
        files: this.filterFiles(data.files)
      });
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

export default App;
