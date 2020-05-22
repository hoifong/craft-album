import React, { useState, useEffect } from 'react';
import styles from './index.module.sass';
import cns from 'classnames';
import { ReactComponent as Loading } from '../../assets/svg/loading.svg';

interface LoadingProps {
    show?: boolean
}

export default (props: LoadingProps) => {
    const [visible, setVisible] = useState(props.show);

    const handleHideDown = () => {
        if (visible && !props.show) {
            //  隐藏
            setTimeout(() => {
                setVisible(false);
            }, 800);
        } else {
            setVisible(props.show);
        }
    }

    useEffect(handleHideDown, [props.show]);

    return (
        <div className={cns(styles.loading, {
            [styles.show]: props.show,
            [styles.hide]: visible && !props.show,
            [styles.none]: !visible && !props.show
        })}>
            <Loading className={styles.loadingSpin} fill='#222222' />
        </div>
    );
}