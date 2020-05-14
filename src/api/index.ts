import { AxiosPromise } from 'axios';
import axios from './axios';
import { responseData, User, returnForAddPhoto, Photo, payloadForDeletePhoto, payloadForUpdateText } from './types';
import { APIS } from '../utils/consts';

export const login: (data: User) => AxiosPromise<responseData<any>> = data => axios.post(APIS.LOGIN, data);

export const register: (data: User) => AxiosPromise<responseData<any>> = data => axios.post(APIS.REGISTER, data);

export const getToken: () => AxiosPromise<responseData<returnForAddPhoto>> = () => axios.post(APIS.QINIU_TOKEN);

export const getPhotos: () => AxiosPromise<responseData<Photo[]>> = () => axios.get(APIS.GET_PHOTOS);

export const updatePhotoText : (data: payloadForUpdateText) => AxiosPromise<responseData> = data => axios.post(APIS.UPDATE_PHOTO_TEXT, data);

export const deletePhoto: (data: payloadForDeletePhoto) => AxiosPromise<responseData> = data => axios.post(APIS.DEL_PHOTO, data);

export const getUser: () => AxiosPromise<responseData<User>> = () => axios.get(APIS.GET_USER);

export const checkUsername: (username: string) => AxiosPromise<responseData<any>> = username => axios.get(APIS.CHECK_USERNAME, {params: {username}});