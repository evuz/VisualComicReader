import { createStore, combineReducers } from 'redux';
import reader from './reducers/reader';
import options from './reducers/options';
import windowState from './reducers/windowState';

function configureStore() {
  const appReducers = combineReducers({
    reader,
    options,
    windowState,
  });

  return createStore(appReducers);
}

export default configureStore;
