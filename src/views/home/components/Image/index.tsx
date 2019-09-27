import React, { useState } from 'react';
import cn from 'classnames';
import { Photo } from '../../../../api/types';
import styles from './index.module.sass';

interface ImageProps {
    photo: Photo
    showText?: boolean
    onClick?: () => void
}

/**
 * 点击触发文字显示/消失
 */

const Image: React.FC<ImageProps> = props => {
    const { showText, onClick, photo } = props;
    const [opacity, setOpacity] = useState(0);

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
            //  消失
            onClick && dispear(onClick);
        } else if (onClick) {
            //  显示
            onClick();
            showup();
        }
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            <img src={photo.originUrl} alt={photo.text} className={styles.bg}></img>
            <div className={styles.img}>
                <img src={photo.originUrl} alt={photo.text}/>
            </div>
            <div style={{ opacity }} className={ cn(styles.mask, (!showText) && styles.dispear) }>
                <h3 className={styles.text}>{photo.text}</h3>
            </div>
        </div>
    );
}

export default Image;