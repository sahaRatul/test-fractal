// Set up your root reducer here...
import { combineReducers } from 'redux';
import testReducer from './testReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    testReducer,
    routing: routerReducer
});

export default rootReducer;