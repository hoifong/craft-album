import { Reducer, ActionCreator } from "redux";
import { ACTION_TYPES, BaseAction } from "./types";

export type LoadingState = boolean;

interface ActionType extends BaseAction {
    show: boolean
}

export const showLoading: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.SET_LOADING,
    show: true
});
export const hideLoading: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.SET_LOADING,
    show: false
});
export const toggleLoading: ActionCreator<BaseAction> = () => ({
    type: ACTION_TYPES.TOGGLE_LOADING
});

export const loadingReducer: Reducer<LoadingState, ActionType> = (state = false, action) => {
    switch(action.type) {
        case ACTION_TYPES.TOGGLE_LOADING:
            //  忽略action中的show值
            return !state;
        case ACTION_TYPES.SET_LOADING:
            return action.show;
        default:
            return state;
    }
}