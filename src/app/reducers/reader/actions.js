import {
  SET_DIRECTORY,
  SET_FILES,
  SET_PAGE,
} from './actionTypes';

export function setDirectory(directory) {
  return {
    type: SET_DIRECTORY,
    directory,
  };
}

export function setFiles(files) {
  return {
    type: SET_FILES,
    files,
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    page,
  };
}
