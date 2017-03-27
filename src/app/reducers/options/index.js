import {
    SET_FULL_HEIGHT,
    SET_FULL_WIDTH,
    SET_SIZE_PERCENT
} from './actionTypes';
export * from './actions';

function options(state = {
    fullHeight: true,
    fullWidth: false,
    percentSize: 100
}, action) {
    switch (action.type) {
        case SET_FULL_WIDTH:
            return Object.assign({}, state, {
                fullHeight: false,
                fullWidth: true,
                percentSize: 100
            })
        case SET_FULL_HEIGHT:
            return Object.assign({}, state, {
                fullHeight: true,
                fullWidth: false,
                percentSize: 100
            })
        case SET_SIZE_PERCENT:
            const { percentSize } = action;
            return Object.assign({}, state, { 
                percentSize
            });
        default:
            return state;
    }
}

export default options;