import { connect } from 'react-redux';

import ReaderComponent from '../components/Reader';

const mapStateToProps = state => ({
  reader: state.reader,
  options: state.options,
});

export default connect(mapStateToProps)(ReaderComponent);
