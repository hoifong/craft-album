import React from 'react';
import styles from './index.module.sass';
import userIcon from '../../../../assets/png/user.png';
import { UserState } from '../../../../store/user';

interface IProps {
    user: UserState
    onUserIconClick: () => void
}

const TopNav: React.FC<IProps> = props => {
    const { user, onUserIconClick } = props;

    return (
        <div className={styles.topNav}>
            <span className={styles.topLeft}> LOGO </span>
            <span className={styles.topRight}>
                <img src={userIcon} alt='user' onClick={onUserIconClick} />
                { user.username }
            </span>
        </div>
    );
}

export default TopNav;