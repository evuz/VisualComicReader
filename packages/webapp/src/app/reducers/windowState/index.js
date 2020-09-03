import { SET_FULL_SCREEN, SET_FETCHING } from './actionTypes';

export * from './actions';

const initialState = {
  fullScreen: false,
  fetching: false,
};

function options(state = initialState, action) {
  switch (action.type) {
    case SET_FULL_SCREEN:
      return Object.assign({}, state, { fullScreen: state.fullScreen });
    case SET_FETCHING:
      return Object.assign({}, state, { fetching: action.state });
    default:
      return state;
  }
}

export default options;
