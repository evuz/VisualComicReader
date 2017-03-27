import { createStore, combineReducers } from 'redux';
import reader from './reducers/reader';
import options from './reducers/options';

function configureStore () {
    const appReducers = combineReducers({
        reader,
        options
    });
    
    return createStore(appReducers);
}

export default configureStore;