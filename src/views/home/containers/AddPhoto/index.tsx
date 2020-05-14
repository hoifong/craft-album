/**
 * 容器：上传图片
 */
import React from 'react';
import Displayer from '../../components/AddPhoto';
import { upload, progressInfo } from '../../../../api/upload';
import { MapStateToProps, connect } from 'react-redux';
import { StoreState } from '../../../../store';
import { UPLOAD_STATUS, startUpload, progressUpload, failedUpload, completeUpload } from '../../../../store/uploader';
import { fetchPhotos } from '../../../../store/banner';
import { validateImageFile } from '../../../../utils/file';
import { ToastState, toast } from '../../../../store/toast';
import { showLoginbox } from '../../../../store/loginbox';

type IProps = {
    bgUrl?: string
}

interface IMapStateToProps {
    username: string
    status: UPLOAD_STATUS
    percent: number
}

interface IMapDispatchToProps {
    startUpload: () => void
    progressUpload: (percent: number) => void
    failedUpload: () => void
    completeUpload: () => void
    toast: (state: ToastState) => void
    showLoginbox: () => void
}

const mapStateToProps: MapStateToProps<IMapStateToProps, {}, StoreState> = state => ({
    username: state.user.username,
    status: state.uploader.status,
    percent: state.uploader.percent
});

const mapDispatchToProps = (dispatch: Function) => ({
    startUpload: () => dispatch(startUpload()),
    progressUpload: (percent: number) => dispatch(progressUpload(percent)),
    failedUpload: () => dispatch(failedUpload()),
    completeUpload: () => {
        dispatch(completeUpload());
        dispatch(toast({
            type: 'success',
            message: '上传成功'
        }))
        dispatch(fetchPhotos());
    },
    toast: (state: ToastState) => dispatch(toast(state)),
    showLoginbox: () => dispatch(showLoginbox())
});

const Wrapper: React.FC<IMapStateToProps & IMapDispatchToProps & IProps> = props => {
    const {
        bgUrl,
        username,
        status,
        percent,
        startUpload,
        progressUpload,
        failedUpload,
        completeUpload,
        toast,
        showLoginbox
    } = props;

    function handleProgress(progress: progressInfo) {
        progressUpload(Math.floor(progress.percent));
    }

    const handleFileSelect = (file: File) => {
        if (file && validateImageFile(file)) {
            startUpload();
            upload({
                file,
                username: username
            }, handleProgress, failedUpload, completeUpload);
        } else {
            toast({
                type: 'error',
                message: '文件格式错误'
            });
        }
    }

    const handleUnlogClick = () => {
        if (status === UPLOAD_STATUS.UNLOG) {
            showLoginbox();
        }
    }

    return <Displayer bgUrl={bgUrl} status={status} percent={percent} onChange={handleFileSelect} onClick={handleUnlogClick} />
}

export default connect<IMapStateToProps, IMapDispatchToProps, IProps, any>(mapStateToProps, mapDispatchToProps)(Wrapper);