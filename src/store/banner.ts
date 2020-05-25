import { ActionCreator, Reducer } from 'redux';
import * as Api from '../api';
import { Photo, payloadForUpdateText } from '../api/types';
import { ACTION_TYPES, BaseAction } from './types';
import { ThunkAction } from 'redux-thunk';
import { initUploader } from './uploader';
import { showLoading, hideLoading } from './loading';
import { toast } from './toast';
import { getUrlQuery } from '../utils/helper';
import { QUERYS_DEFINE } from '../utils/consts';

export interface BannerState {
    photos: Photo[],
    showIndex: number
}

interface ActionType extends BaseAction {
    photos?: Photo[],
    update?: Photo,
    showIndex?: number
}

const initValue: BannerState = {
    showIndex: Math.max(parseInt(getUrlQuery(QUERYS_DEFINE.PAGE)), 1) - 1,
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
        Api.getPhotos()
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

export const updatePhotoText: ActionCreator<ThunkAction<any, any, any, any>> = (payload: payloadForUpdateText) => {
    return dispatch => {
        dispatch(showLoading())
        Api.updatePhotoText(payload)
            .then(() => {
                dispatch(toast({
                    type: 'success',
                    message: '修改成功'
                }));
                dispatch({
                    type: ACTION_TYPES.UPDATE_PHOTO,
                    photo: payload
                });
            })
            .catch(e => dispatch(toast({
                type: 'error',
                message: e
            })))
            .finally(() => {
                dispatch(hideLoading());
            });
    }
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
    console.log(state);
    switch(action.type) {
        case ACTION_TYPES.GET_PHOTOS:
            const photos = (action.photos || []).filter(item => item.uploaded); //确保能访问到资源
            const showIndex = photos.length === 0 ? 0 : (state.showIndex > photos.length ? photos.length - 1 : state.showIndex)
            return {
                showIndex,
                photos: photos
            };
        case ACTION_TYPES.UPDATE_PHOTO:
            const photo = action.update;
            if (!photo) break;
            const idx = state.photos.findIndex(item => item.photoId === photo.photoId);
            if (idx === -1) break;
            return {
                ...state,
                photos: [
                    ...state.photos.slice(0, idx),
                    {...state.photos[idx], ...photo},
                    ...state.photos.slice(idx+1, state.photos.length)
                ]
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
    return state;
}
