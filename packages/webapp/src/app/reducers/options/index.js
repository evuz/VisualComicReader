import {
  SET_FULL_HEIGHT,
  SET_FULL_WIDTH,
  SET_SIZE_PERCENT,
  SET_TWO_COLUMNS,
  ZOOM_IN,
  ZOOM_OUT,
} from './actionTypes';

export * from './actions';

const initialState = {
  fullHeight: true,
  fullWidth: false,
  twoColumns: false,
  percentSize: 100,
};

const zoomStep = 10;

function options(state = initialState, action) {
  switch (action.type) {
    case SET_FULL_WIDTH:
      return Object.assign({}, state, {
        fullHeight: false,
        fullWidth: true,
        percentSize: 100,
      });
    case SET_FULL_HEIGHT:
      return Object.assign({}, state, {
        fullHeight: true,
        fullWidth: false,
        percentSize: 100,
      });
    case SET_SIZE_PERCENT: {
      const { percentSize } = action;
      return Object.assign({}, state, {
        percentSize,
      });
    }
    case SET_TWO_COLUMNS: {
      const { twoColumns } = action;
      return Object.assign({}, state, {
        fullHeight: true,
        fullWidth: false,
        twoColumns,
        percentSize: 100,
      });
    }
    case ZOOM_IN:
      return Object.assign({}, state, {
        percentSize: state.percentSize + zoomStep,
      });
    case ZOOM_OUT:
      return Object.assign({}, state, {
        percentSize: state.percentSize - zoomStep,
      });
    default:
      return state;
  }
}

export default options;
