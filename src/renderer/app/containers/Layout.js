import { connect } from 'react-redux';

import LayoutComponent from '../components/Layout';

const mapStateToProps = state => ({
  fullScreen: state.windowState.fullScreen,
});

export default connect(mapStateToProps)(LayoutComponent);
