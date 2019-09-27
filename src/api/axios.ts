import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { responseData } from './types';

const axios: AxiosInstance = Axios.create();

axios.interceptors.response.use((response: AxiosResponse<responseData>) => {
    const data: responseData = response.data;
    if (data.success && data.success === 1) {
        return response;
    }

    return Promise.reject(new Error(data.msg))
}, (err: any) => {
    return Promise.reject(err);
});

export default axios;

