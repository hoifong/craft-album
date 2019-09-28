import { userReducer, User } from './user';
import { combineReducers } from 'redux';

export interface StoreState {
    user: User
}

export default combineReducers({
    user: userReducer
});