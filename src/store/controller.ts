import { ACTION_TYPES } from "./types";
import { Action, ActionCreator, Reducer } from "redux";
import { ThunkAction } from "redux-thunk";
import { HIDE_CONTROLLER_IN_SECONDS } from "../utils/consts";

export interface ControllerState {
    trash: boolean,
    arrow: boolean,
    progress: boolean
}

const initState: ControllerState = {
    trash: false,
    arrow: false,
    progress: false
}

interface ActionType extends Action<ACTION_TYPES> {
    state: ControllerState
}

export const showController: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.SET_CONTROLLER_VISIBLE,
    state: {
        trash: true,
        arrow: true,
        progress: true
    }
});

let timer: any = null;

export const showControllerInTime: ActionCreator<ThunkAction<any, any, any, any>> = () => {
    return dispatch => {
        if (timer) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                dispatch(hideController());
                timer = null;
            }, HIDE_CONTROLLER_IN_SECONDS*1000);
        } else {
            dispatch(showController());
            timer = setTimeout(() => {
                dispatch(hideController());
                timer = null;
            }, HIDE_CONTROLLER_IN_SECONDS*1000);
        }
    };
}

export const hideController: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.SET_CONTROLLER_VISIBLE,
    state: {
        trash: false,
        arrow: false,
        progress: false
    }
});

export const ControllerReducer: Reducer<ControllerState, ActionType> = (state = initState, action) => {
    switch(action.type) {
        case ACTION_TYPES.SET_CONTROLLER_VISIBLE:
            return action.state;
        default:
            return state;
    }
}
