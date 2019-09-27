import React from 'react';
import trashPng from '../../../../assets/png/trash.png';
import styles from './index.module.sass';

const Trash: React.FC = props => {
    return (
        <div className={styles.trash}>
            <img src={trashPng} alt=''/>
        </div>
    )
}

export default Trash;