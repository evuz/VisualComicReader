import { SET_FULL_SCREEN } from './actionTypes';

export function setFullScreen(value) {
    return {
        type: SET_FULL_SCREEN,
        fullScreen: value
    }
}