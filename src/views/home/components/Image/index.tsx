/**
 * 组件：Banner的单个图片元素
 */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Photo, payloadForUpdateText } from '../../../../api/types';
import styles from './index.module.sass';
import { QINIU_DOMAIN } from '../../../../utils/consts';
import FlexTextarea from '../FlexTextarea';

export interface ImageProps {
    photo: Photo
    showText?: boolean
    onClick?: () => void
    onTextEditComplete?: (payload: payloadForUpdateText) => void
}

/**
 * 点击触发文字显示/消失
 */

const Image: React.FC<ImageProps> = props => {
    const { showText, onClick, photo, onTextEditComplete } = props;
    const [opacity, setOpacity] = useState(0);
    const [editFocus, setEditFocus] = useState(false);
    const [newText, setNewText] = useState(photo.text || '');

    const dispear = (endCb: () => void) => {
        let value = 1;
        const animation = () => {
            value -= 0.1;
            setOpacity(value);

            if (value > 0) {
                requestAnimationFrame(animation);
            } else {
                endCb();
            }
        }

        requestAnimationFrame(animation);
    }

    const showup = (endCb?: () => void) => {
        let value = 0;
        const animation = () => {
            value += 0.1;
            setOpacity(value);

            if (value < 1) {
                requestAnimationFrame(animation);
            } else {
                endCb && endCb();
            }
        }

        requestAnimationFrame(animation);
    }

    const handleClick = () => {
        if (showText) {
            //  如果正在编辑文本
            if (editFocus) {
                setEditFocus(false);

                console.log(newText, photo.text);

                newText !== photo.text && onTextEditComplete && onTextEditComplete({
                    photoId: photo.photoId,
                    text: newText
                });
                return
            }
            //  消失
            onClick && dispear(onClick);
        } else if (onClick) {
            //  显示
            onClick();
            showup();
        }
    };

    useEffect(() => {
        setNewText(photo.text);
    }, [photo]);

    const src = 'http://' + QINIU_DOMAIN + '/' + photo.photoId;

    return (
        <div className={styles.container} onClick={handleClick}>
            <img src={src} alt={photo.text} className={styles.bg} />
            <div className={styles.img}>
                <img src={src} alt={photo.text}/>
            </div>
            <div style={{ opacity }} className={ cn(styles.mask, (!showText) && styles.dispear) }>
                <FlexTextarea
                    value={photo.text}
                    onChange={setNewText}
                    onFocus={() => setEditFocus(true)}/>
            </div>
        </div>
    );
}

export default Image;