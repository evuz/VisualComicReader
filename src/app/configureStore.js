import { createStore, combineReducers } from 'redux';
import reader from './reducers/reader';

function configureStore () {
    const appReducers = combineReducers({
        reader
    });
    
    return createStore(appReducers);
}

export default configureStore;