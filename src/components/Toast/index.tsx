import React from 'react';
import cns from 'classnames';
import styles from './index.module.sass';
import { ToastType } from '../../store/toast';

export interface IProps {
    message: string
    type: ToastType
    visible: boolean
}

const Toast: React.FC<IProps> = props => {
    const { message, type, visible } = props;

    const className = cns([
        styles.toast,
        styles[type],
        visible&&styles.visible
    ]);

    return (
        <div className={className}>
            {message}
        </div>
    );
}

export default Toast;