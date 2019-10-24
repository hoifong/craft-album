import { Reducer, ActionCreator } from 'redux';
import { ACTION_TYPES, BaseAction } from './types';

export enum UPLOAD_STATUS {
    UNLOG, INIT, UPLOADING, FAILED, COMPLETE
}

export interface UploaderState {
    percent: number
    status: UPLOAD_STATUS
}

interface ActionType extends BaseAction {
    state: UploaderState
}

const initValue: UploaderState = {
    percent: 0,
    status: UPLOAD_STATUS.UNLOG
}

/**
 * actions
 */
export const initUploader: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.INIT_UPLOAD,
    state: {
        status: UPLOAD_STATUS.INIT,
        percent: 0
    }
});

export const startUpload: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.START_UPLOAD,
    state: {
        status: UPLOAD_STATUS.UPLOADING,
        percent: 0
    }
});

export const progressUpload: ActionCreator<ActionType> = (percentage: number) => ({
    type: ACTION_TYPES.PROGRESS_UPLOAD,
    state: {
        status: UPLOAD_STATUS.UPLOADING,
        percent: percentage
    }
});

export const failedUpload: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.END_UPLOAD,
    state: {
        status: UPLOAD_STATUS.FAILED,
        percent: 0
    }
});

export const completeUpload: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.END_UPLOAD,
    state: {
        status: UPLOAD_STATUS.COMPLETE,
        percent: 100
    }
});

/**
 * reducer
 */

export const uploaderReducer: Reducer<UploaderState, ActionType> = (state = initValue, action) => {
    switch(action.type) {
        case ACTION_TYPES.START_UPLOAD:
        case ACTION_TYPES.INIT_UPLOAD:
        case ACTION_TYPES.PROGRESS_UPLOAD:
        case ACTION_TYPES.END_UPLOAD:
            return action.state;
        default:
            return state;
    }
}