import { AxiosPromise } from 'axios';
import axios from './axios';
import { responseData, User } from './types';
import { APIS } from '../utils/consts';

export const login: (data: User) => AxiosPromise<responseData<any>> = data => axios.post(APIS.LOGIN, data);

export const register: (data: User) => AxiosPromise<responseData<any>> = data => axios.post(APIS.REGISTER, data);

export const getToken: () => AxiosPromise<responseData<string>> = () => axios.get(APIS.QINIU_TOKEN);
