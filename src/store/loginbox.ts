import { ACTION_TYPES, BaseAction } from "./types";
import { ActionCreator, Reducer } from "redux";

export type LoginboxState = boolean;

interface ActionType extends BaseAction {
    show: boolean
}

export const showLoginbox: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.SET_LOGINBOX,
    show: true
});

export const hideLoginbox: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.SET_LOGINBOX,
    show: false
});

export const LoginboxReducer: Reducer<LoginboxState, ActionType> = (state = false, action) => {
    switch(action.type) {
        case ACTION_TYPES.SET_LOGINBOX:
            return action.show;
        default:
            return state;
    }
};