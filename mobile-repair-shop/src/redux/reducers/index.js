import { combineReducers } from 'redux';
import repairReducer from './repairReducer'; // Import your repair reducer

const rootReducer = combineReducers({
  repairs: repairReducer, // Add other reducers as necessary
});

export default rootReducer;
