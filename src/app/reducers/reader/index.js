import {
    SET_DIRECTORY,
    SET_FILES,
    SET_PAGE
} from './actionTypes';
export * from './actions';

function reader(state = {
    files: [],
    directory: '',
    page: 0
}, action) {
    switch (action.type) {
        case SET_DIRECTORY:
            const { directory } = action;
            return Object.assign({}, state, { directory })
        case SET_FILES:
            const { files } = action;
            return Object.assign({}, state, { files })
        case SET_PAGE:
            const { page } = action;
            return Object.assign({}, state, { page })
        default:
            return state;
    }
}

export default reader;