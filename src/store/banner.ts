import { ActionCreator, Reducer } from 'redux';
import { getPhotos as apiGetPhotos } from '../api';
import { Photo } from '../api/types';
import { ACTION_TYPES } from './types';
import { ThunkAction } from 'redux-thunk';
import { initUploader } from './uploader';
import { showLoading, hideLoading } from './loading';

export interface BannerState {
    photos: Photo[],
    showIndex: number
}

interface ActionType {
    type: ACTION_TYPES,
    photos?: Photo[],
    showIndex?: number
}

const initValue: BannerState = {
    showIndex: 0,
    photos: []
}

/**
 * actions
 */
export const getPhotos: ActionCreator<ActionType> = (photos: Photo[]) => ({
    type: ACTION_TYPES.GET_PHOTOS,
    photos
});

export const fetchPhotos: ActionCreator<ThunkAction<any, any, any, any>> = () => {
    return dispatch => {
        dispatch(showLoading())
        apiGetPhotos()
            .then(({data}) => {
                dispatch(getPhotos(data.data));
                dispatch(initUploader());
            })
            .catch(() => {})
            .finally(() => {
                dispatch(hideLoading());
            });
    };
}

export const slideLeft: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.SLIDE_LEFT
});

export const slideRight: ActionCreator<ActionType> = () => ({
    type: ACTION_TYPES.SLIDE_RIGHT
});

export const slideTo: ActionCreator<ActionType> = (index: number) => ({
    type: ACTION_TYPES.SLIDE_TO,
    showIndex: index
});

/**
 * reducer
 */
export const bannerReducer: Reducer<BannerState, ActionType> = (state = initValue, action) => {
    switch(action.type) {
        case ACTION_TYPES.GET_PHOTOS:
            const photos = (action.photos || []).filter(item => item.uploaded); //确保能访问到资源
            const showIndex = photos.length === 0 ? 0 : (state.showIndex > photos.length ? photos.length - 1 : state.showIndex)
            return {
                showIndex,
                photos: photos
            };
        case ACTION_TYPES.SLIDE_LEFT:
            return {
                ...state,
                showIndex: state.showIndex - 1
            };
        case ACTION_TYPES.SLIDE_RIGHT:
            return {
                ...state,
                showIndex: state.showIndex + 1
            };
        case ACTION_TYPES.SLIDE_TO:
            return {
                ...state,
                showIndex: action.showIndex || 0
            };
        default:
            return state;
    }
}
