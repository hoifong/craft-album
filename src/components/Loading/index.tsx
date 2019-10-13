import React from 'react';
import styles from './index.module.sass';

export default () => (
    <div className={styles.loading}>
        <div className={styles.loadingSpin}></div>
    </div>
)