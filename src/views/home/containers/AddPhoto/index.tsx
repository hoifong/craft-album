import React, { useState } from 'react';
import Wrapper, { STATUS } from '../../components/AddPhoto';
import { upload, progressInfo } from '../../../../api/upload';
import { ProviderProps, MapStateToProps, ConnectedComponent, connect } from 'react-redux';
import { StoreState } from '../../../../store';

type IProps = {
    bgUrl?: string
}

type mapStateToPropsType = {
    username: string
}

const AddPhoto: React.FC<mapStateToPropsType & IProps> = (props) => {
    const [status, setStatus] = useState<STATUS>(STATUS.init);
    const [percent, setPercent] = useState<number>(0);
    const [error, setError] = useState<string>('');

    function handleProgress(progress: progressInfo) {
        console.log(progress.percent);
    }

    function handleError(e: any) {
        console.log(e);
    }

    function handleComplete() {
        console.log('上传成功');
    }

    const handleFileSelect = (file: Blob) => {
        upload({
            file,
            username: props.username
        }, handleProgress, handleError, handleComplete);
    }

    return <Wrapper onChange={handleFileSelect} status={status} percent={percent} error={error} />
}

const mapStateToProps: MapStateToProps<mapStateToPropsType, IProps, StoreState> = (state) => ({
    username: state.user.username
});

export default connect(mapStateToProps)(AddPhoto);