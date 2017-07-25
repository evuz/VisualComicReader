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

export function nextPage() {
  return (dispatch, getState) => {
    const { reader: { page: currentPage, files }, options: { twoColumns } } = getState();
    const newPage = twoColumns ? currentPage + 2 : currentPage + 1;
    if (newPage < files.length) dispatch(setPage(newPage));
    else if (twoColumns && newPage === files.length + 1) dispatch(setPage(newPage - 1));
  };
}

export function previousPage() {
  return (dispatch, getState) => {
    const { reader: { page: currentPage }, options: { twoColumns } } = getState();
    const newPage = twoColumns ? currentPage - 2 : currentPage - 1;
    if (newPage > 0) dispatch(setPage(newPage));
    else dispatch(setPage(0));
  };
}
