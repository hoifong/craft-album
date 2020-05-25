import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { userReducer, UserState } from './user';
import { combineReducers, createStore, applyMiddleware, Middleware } from 'redux';
import { BannerState, bannerReducer } from './banner';
import { UploaderState, uploaderReducer } from './uploader';
import { LoadingState, loadingReducer } from './loading';
import { ToastState, toastReducer } from './toast';
import { LoginboxState, LoginboxReducer } from './loginbox';
import { ControllerState, ControllerReducer } from './controller';
import queryCache from '../middlewares/queryCache';

export interface StoreState {
    user: UserState
    banner: BannerState
    uploader: UploaderState
    loading: LoadingState
    toast: ToastState
    loginbox: LoginboxState
    controller: ControllerState
}

const rootReducer = combineReducers({
    user: userReducer,
    banner: bannerReducer,
    uploader: uploaderReducer,
    loading: loadingReducer,
    toast: toastReducer,
    loginbox: LoginboxReducer,
    controller: ControllerReducer
});

const middlewares: Middleware[] = [
    thunk, queryCache
];

process.env.NODE_ENV !== 'production' && middlewares.push(logger);

const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );

export default store;
