import React, { useRef } from 'react';
import addImg from '../../../../assets/png/add.png';
import styles from './index.module.sass';
import { upload, progressInfo } from '../../../../api/upload';

interface AddPhotoProps {
    bgUrl?: string
}

const AddPhoto: React.FC<AddPhotoProps> = props => {

    const fileInputEl = useRef<HTMLInputElement>(null);

    const handleFileChange = () => {
        if (fileInputEl.current && fileInputEl.current.files) {
            upload({
                file: fileInputEl.current.files[0],
                username: 'hoifong',
            }, handleProgress, handleError, handleComplete)
        }
    }

    function handleProgress(progress: progressInfo) {
        console.log(progress.percent);
    }

    function handleError(e: any) {
        console.log(e);
    }

    function handleComplete() {
        console.log('上传成功');
    }

    return (
        <div className={styles.addPhoto}>
            {props.bgUrl && <img src={props.bgUrl} alt='' className={styles.bg} />}
            <div className={styles.addPng}>
                <img src={addImg} alt="添加图片" />
                <input type='file' ref={fileInputEl} onChange={ handleFileChange }/>
            </div>
        </div>
    )
}

export default AddPhoto;