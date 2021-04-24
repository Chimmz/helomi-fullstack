import { ADD_ALERT, REMOVE_ALERT } from './alert.action.types';

export const addAlert = alert => ({ type: ADD_ALERT, payload: { alert } });
export const removeAlert = id => ({ type: REMOVE_ALERT, payload: { id } });
