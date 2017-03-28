import {
    SET_FULL_HEIGHT,
    SET_FULL_WIDTH,
    SET_SIZE_PERCENT,
    SET_TWO_COLUMNS
} from './actionTypes';

export function setFullHeight() {
    return {
        type: SET_FULL_HEIGHT
    }
}

export function setFullWidth () {
    return {
        type: SET_FULL_WIDTH
    }
}

export function setPercentSize(percentSize) {
    return {
        type: SET_SIZE_PERCENT,
        percentSize
    }
}

export function setTwoColumns(twoColumns) {
    return {
        type: SET_TWO_COLUMNS,
        twoColumns
    }
}