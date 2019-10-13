import React from 'react';
import trashPng from '../../../../assets/png/trash.png';
import styles from './index.module.sass';

interface IProps {
    onClick?: () => void
}

const Trash: React.FC<IProps> = props => {
    return (
        <div className={styles.trash} onClick={props.onClick}>
            <img src={trashPng} alt=''/>
        </div>
    )
}

export default Trash;