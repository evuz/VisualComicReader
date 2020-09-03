import React from 'react';
import Spinner from 'react-spinkit';

import './index.scss';

const Loading = ({ state }) => (
  state ?
    <div className="loading_component">
      {<Spinner name="double-bounce" style={styles.spinner} />}
    </div> :
    null
);

const styles = {
  spinner: {
    width: '80px',
    height: '80px',
    color: '#FAF9F9',
  },
};

export default Loading;
