import { combineReducers } from 'redux';
import msgReducer from './msg/msg.reducer';

export default combineReducers({
   msg: msgReducer
});
