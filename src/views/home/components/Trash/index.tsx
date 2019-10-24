import React from 'react';
import cn from 'classnames';
import trashPng from '../../../../assets/png/trash.png';
import styles from './index.module.sass';

interface IProps {
    onClick?: () => void
    hide?: boolean
}

const Trash: React.FC<IProps> = props => {
    return (
        <div className={cn([styles.trash, props.hide&&styles.trashHide])} onClick={props.onClick}>
            <img src={trashPng} alt=''/>
        </div>
    )
}

export default Trash;