import { Reducer, ActionCreator } from "redux";
import { ACTION_TYPES } from "./types";
import { getUser } from "../api";
import { showLoading, hideLoading } from "./loading";
import { initUploader } from "./uploader";

export interface UserState {
    username: string
    createdAt: Date
}

interface ActionType {
    type: ACTION_TYPES
    user: UserState
}

const initValue: UserState = {
    username: '',
    createdAt: new Date()
}

/**
 * actions
 */

export const setUser: ActionCreator<ActionType> = (user: UserState) => ({
    type: ACTION_TYPES.GET_USER,
    user
});

export const fetchUser = () => (dispatch: Function) => {
    dispatch(showLoading());
    getUser()
        .then(({data}) => {
            dispatch(setUser(data.data));
            dispatch(initUploader());
        })
        .catch(() => {})
        .finally(() => {
            dispatch(hideLoading());
        });
} 

/**
 * reducers
 */
export const userReducer: Reducer<UserState, ActionType> = (user = initValue, action) => {
    switch(action.type) {
        case ACTION_TYPES.GET_USER:
            return action.user;
        default:
            return user;
    }
}
