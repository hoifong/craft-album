import React from 'react';
import cn from 'classnames';
import styles from './index.module.sass';
import leftArrowPng from '../../../../assets/png/left-arrow.png';
import rightArrowPng from '../../../../assets/png/right-arrow.png';

interface ArrowProps {
    direct: 'left'|'right',
    onClick?: () => void
}

const style = {
    left: styles.left,
    right: styles.right
};

const Arrow: React.FC<ArrowProps> = props => {

    return <div onClick={props.onClick} className={cn([styles.arrow, style[props.direct]])}>
        <img src={props.direct === 'left' ? leftArrowPng : rightArrowPng} alt='' />
    </div>
}

export default Arrow;