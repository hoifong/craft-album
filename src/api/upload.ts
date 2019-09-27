import { upload as apiUpload } from 'qiniu-js';
import uuid from 'short-uuid';
import { getToken } from '.';
import { AxiosResponse } from 'axios';
import { responseData } from './types';

export interface uploadParam {
    file: Blob,
    username: string
}

export interface progressInfo {
    loaded: number  //字节
    total: number   //字节
    percent: number //0-100
}

export const upload: (
    param: uploadParam,
    onProgress: (info: progressInfo) => void,
    onError: (e: any) => void,
    onComplete: (res: qiniu.CompletedResult) => void
    ) => void = (param, onProgress, onError, onComplete) => {

    const photoid = uuid(param.username).generate();

    //  返回unsubscribe函数

    getToken()
        .then((res: AxiosResponse<responseData<string>>) => {
            const token = res.data.data;

            apiUpload(
                param.file,
                photoid,
                token,
                {
                    //  putExtra
                    //  限制文件类型
                    mimeType: ["image/png", "image/jpeg"]
                },
                {
                    //  config
                }
            ).subscribe({
                next: (res: qiniu.Next) => {
                    onProgress(res.total);
                },
                error: (e: qiniu.Error) => {
                    onError(e);
                },
                complete: (res: qiniu.CompletedResult) => {
                    onComplete(res);
                }
            });

        })
        .catch(e => {
            console.log(e);
        });
}