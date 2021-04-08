import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import msgReducer from './msg/msg.reducer';
import alertReducer from './alert/alert.reducer';

export default combineReducers({
   msg: msgReducer,
   user: userReducer,
   alert: alertReducer
});
