import { combineReducers } from 'redux';
import GoogleReducer from './reducer_google'

//So in the regular code, your component created an action which went to actions.js.  That then goes to a specific reducer.  All the reducers are then bundled up here
//and sent to the store.
const rootReducer = combineReducers({
  google: GoogleReducer
});

export default rootReducer;

