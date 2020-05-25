import { Middleware, Dispatch } from 'redux';
import { StoreState } from '../store';
import { BaseAction, ACTION_TYPES } from '../store/types';
import { setUrlQuery } from '../utils/helper';
import { QUERYS_DEFINE } from '../utils/consts';

const queryCache: Middleware<any, StoreState, Dispatch<BaseAction>> = store =>  next => action => {
    next(action);
    if (action.type === ACTION_TYPES.SLIDE_LEFT
        || action.type === ACTION_TYPES.SLIDE_RIGHT
        || action.type === ACTION_TYPES.SLIDE_TO) {
            const page = store.getState().banner.showIndex;
            setUrlQuery(QUERYS_DEFINE.PAGE, page + 1);
        }
}

export default queryCache;