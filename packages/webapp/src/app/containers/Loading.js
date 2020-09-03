import { connect } from 'react-redux';

import LoadingComponent from '../components/Loading';

const mapStateToProps = state => ({
  state: state.windowState.fetching,
});

export default connect(mapStateToProps)(LoadingComponent);
