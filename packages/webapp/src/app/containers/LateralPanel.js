import { connect } from 'react-redux'

import LateralPanelComponent from '../components/LateralPanel'
import { setPage } from '../reducers/reader'

const mapStateToProps = (state) => {
  const {
    reader: { directory, files, page },
  } = state
  return {
    directory,
    files,
    page,
  }
}

const mapDispatchToProps = {
  onClickPage: setPage,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LateralPanelComponent)
