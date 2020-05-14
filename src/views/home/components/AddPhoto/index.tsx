/**
 * 组件：上传图片
 */
import React, { useRef } from 'react';
import addImg from '../../../../assets/png/add.png';
import styles from './index.module.sass';
import CircleProgress from '../CircleProgress';
import { UPLOAD_STATUS } from '../../../../store/uploader';

interface AddPhotoProps {
    bgUrl?: string,
    status: UPLOAD_STATUS,
    percent?: number,
    error?: string,
    onChange?: (file: File) => void,
    onClick?: () => void
}

const AddPhoto: React.FC<AddPhotoProps> = props => {

    const { bgUrl, status, percent, onChange, onClick } = props;

    const fileInputEl = useRef<HTMLInputElement>(null);

    const handleFileChange = () => {
        if (fileInputEl.current && fileInputEl.current.files) {
            onChange && onChange(fileInputEl.current.files[0]);
        }
    }

    return (
        <div className={styles.addPhoto}>
            {bgUrl && <img src={bgUrl} alt='' className={styles.bg} />}
            {
                status === UPLOAD_STATUS.INIT || status === UPLOAD_STATUS.UNLOG
                ?
                <div className={styles.addPng} onClick={onClick}>
                    <img src={addImg} alt="添加图片" />
                    {
                        //  未登录状态不现实选择文件框
                        status !== UPLOAD_STATUS.UNLOG &&
                        <input type='file' ref={fileInputEl} onChange={ handleFileChange }/>
                    }
                </div>
                :
                <CircleProgress percent={percent} />
            }
        </div>
    )
}

export default AddPhoto;