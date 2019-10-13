import { ACTION_TYPES, PURE_ACTION } from "./types";
import { ActionCreator, Reducer } from "redux";
import { StoreState } from ".";

export type ToastType = 'error' | 'success' | 'warning' | 'loading';

export interface ToastState {
    message: string
    type: ToastType
    visible?: boolean
}

const initValue: ToastState = {
    message: '',
    type: 'warning',
    visible: false
}

interface ActionType {
    type: ACTION_TYPES
    state: ToastState
}

//  直接显示toast
export const showToast: ActionCreator<ActionType> = (state: ToastState) => ({
    type: ACTION_TYPES.SHOW_TOAST,
    state
});

let hideToastTask: any = null;
let toastTask: any = null;

//  直接显示toast，并在n秒后关闭
export const showToastIn = (state: ToastState, seconds: number) => (dispatch: Function) => {
    dispatch(showToast(state));
    hideToastTask = setTimeout(() => {
        dispatch(hideToast());
    }, seconds*1000);
}

//  如果toast正处于显示状态，先关闭，然后再显示toast并在2秒后关闭
export const toast = (state: ToastState) => (dispatch: Function, getState: () => StoreState) => {
    const { visible } = getState().toast;
    if (!visible) {
        return dispatch(showToastIn(state, 2));
    }
    dispatch(hideToast());
    if (toastTask) {
        //  覆盖之前的toast
        clearTimeout(toastTask);
        toastTask = null;
    }
    toastTask = setTimeout(() => {
        dispatch(showToastIn(state, 2));
    }, 1000);//1秒动画间隔
}

//  关闭toast
export const hideToast: ActionCreator<PURE_ACTION> = () => ({
    type: ACTION_TYPES.HIDE_TOAST
});

export const toastReducer: Reducer<ToastState, ActionType> = (state = initValue, action) => {
    switch(action.type) {
        case ACTION_TYPES.SHOW_TOAST:
            return {
                ...action.state,
                visible: true
            };
        case ACTION_TYPES.HIDE_TOAST:
            if (hideToastTask) {
                clearTimeout(hideToastTask);
                hideToastTask = null;
            }
            return {
                ...state,
                visible: false
            };
        default:
            return state;
    }
}