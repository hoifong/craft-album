import { Action } from "redux";

export enum ACTION_TYPES {
    GET_USER = 0xA00001,

    GET_PHOTOS,
    UPDATE_PHOTO,
    SLIDE_LEFT,
    SLIDE_RIGHT,
    SLIDE_TO,

    START_UPLOAD,
    PROGRESS_UPLOAD,
    END_UPLOAD,
    INIT_UPLOAD,

    SET_LOADING,
    TOGGLE_LOADING,

    SET_LOGINBOX,

    SHOW_TOAST,
    HIDE_TOAST,

    SET_CONTROLLER_VISIBLE
}

export interface PURE_ACTION {
    type: ACTION_TYPES
}

export type BaseAction = Action<ACTION_TYPES>;