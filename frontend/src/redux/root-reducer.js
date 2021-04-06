import { combineReducers } from 'redux';
import msgReducer from './msg/msg.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
   msg: msgReducer,
   user: userReducer
});
