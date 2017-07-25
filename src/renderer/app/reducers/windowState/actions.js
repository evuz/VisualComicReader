import { SET_FULL_SCREEN, SET_FETCHING } from './actionTypes';

export function setFullScreen(value) {
  return {
    type: SET_FULL_SCREEN,
    fullScreen: value,
  };
}

export function setFetching(state) {
  return {
    type: SET_FETCHING,
    state,
  };
}
