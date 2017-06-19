import { SET_FULL_SCREEN } from './actionTypes';

export * from './actions';

function options(
  state = {
    fullScreen: false,
  },
  action,
) {
  switch (action.type) {
    case SET_FULL_SCREEN: {
      const { fullScreen } = action;
      return Object.assign({}, state, {
        fullScreen,
      });
    }
    default:
      return state;
  }
}

export default options;
