import React, { useRef } from 'react';
import addImg from '../../../../assets/png/add.png';
import styles from './index.module.sass';

interface AddPhotoProps {
    bgUrl?: string,
    status: STATUS,
    percent?: number,
    error?: string,
    onChange?: (file: Blob) => void
}

export enum STATUS {
    init, uploading, uploaded
}

const AddPhoto: React.FC<AddPhotoProps> = props => {

    const { bgUrl, status, percent, error, onChange } = props;

    const fileInputEl = useRef<HTMLInputElement>(null);

    const handleFileChange = () => {
        if (fileInputEl.current && fileInputEl.current.files) {
            onChange && onChange(fileInputEl.current.files[0]);
        }
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