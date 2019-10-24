import { userReducer, UserState } from './user';
import { combineReducers } from 'redux';
import { BannerState, bannerReducer } from './banner';
import { UploaderState, uploaderReducer } from './uploader';
import { LoadingState, loadingReducer } from './loading';
import { ToastState, toastReducer } from './toast';
import { LoginboxState, LoginboxReducer } from './loginbox';
import { ControllerState, ControllerReducer } from './controller';

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

export default rootReducer;
