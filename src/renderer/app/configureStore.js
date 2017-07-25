import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reader from './reducers/reader';
import options from './reducers/options';
import windowState from './reducers/windowState';

function configureStore() {
  const appReducers = combineReducers({
    reader,
    options,
    windowState,
  });

  let enhacer;
  if (process.env.NODE_ENV === 'development') {
    enhacer = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    );
  } else {
    enhacer = applyMiddleware(thunk);
  }

  return createStore(appReducers, enhacer);
}

export default configureStore;
