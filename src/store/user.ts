import { Reducer, Action, ActionCreator } from "redux";

export interface User {
    username: string
    createdAt: Date
}

interface ActionType {
    type: TYPES
    user: User
}

const initValue: User = {
    username: '',
    createdAt: new Date()
}

/**
 * types
 */
export enum TYPES {
    SET_USER
}

/**
 * actions
 */

export const setUser: ActionCreator<ActionType> = (user: User) => ({
    type: TYPES.SET_USER,
    user
});

/**
 * reducers
 */
export const userReducer: Reducer<User, ActionType> = (user = initValue, action) => {
    switch(action.type) {
        case TYPES.SET_USER:
            return action.user;
        default:
            return user;
    }
}
