import { Reducer, ActionCreator } from 'redux';
import { Photo } from '../api/types';
import { ACTION_TYPES } from './types';

export type PhotoState = Photo;

interface ActionType {
    type: ACTION_TYPES
    photos: PhotoState[]
}

const initValue: PhotoState[] = [];

/**
 * axtions
 */

export const getPhotos: ActionCreator<ActionType> = (photos: PhotoState[]) => ({
    type: ACTION_TYPES.GET_PHOTOS,
    photos
});

/**
 * reducers
 */
export const photosReducer: Reducer<PhotoState[], ActionType> = (photos = initValue, action) => {
    switch(action.type) {
        case ACTION_TYPES.GET_PHOTOS:
            return action.photos;
        default:
            return photos;
    }
}