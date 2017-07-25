import {
  SET_FULL_HEIGHT,
  SET_FULL_WIDTH,
  SET_SIZE_PERCENT,
  SET_TWO_COLUMNS,
  ZOOM_IN,
  ZOOM_OUT,
} from './actionTypes';

export function setFullHeight() {
  return {
    type: SET_FULL_HEIGHT,
  };
}

export function setFullWidth() {
  return {
    type: SET_FULL_WIDTH,
  };
}

export function setPercentSize(percentSize) {
  return {
    type: SET_SIZE_PERCENT,
    percentSize,
  };
}

export function toogleTwoColumns() {
  return (dispatch, getState) => {
    const { twoColumns } = getState().options;
    dispatch(setTwoColumns(!twoColumns));
  };
}

export function setTwoColumns(twoColumns) {
  return {
    type: SET_TWO_COLUMNS,
    twoColumns,
  };
}

export function zoomIn() {
  console.log('zoomIn');
  return {
    type: ZOOM_IN,
  };
}

export function zoomOut() {
  console.log('zoomOut');
  return {
    type: ZOOM_OUT,
  };
}
