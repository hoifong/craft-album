import React, { useState } from 'react';
import styles from './index.module.sass';
import WeixinIcon from '../../../../assets/png/weixin.png';
import QQIcon from '../../../../assets/png/qq.png';
import { User } from '../../../../api/types';

export type STATUS = 'reged'|'unreged'|'init'|'loading';

interface IProps {
    status: STATUS;
    error: string
    onSubmit?: (form: User) => void
    onNeedCheckUsername?: (username: string) => void
    onQuit?: () => void
}

const tip = {
    'reged': '该用户名已注册，点击下方按钮登录。',
    'unreged': '该用户名未注册，点击下方按钮进行注册；并确认密码输入无误。',
    'loading': '',
    'init': ''
};

const buttonContent = {
    'reged': '登录',
    'unreged': '注册',
    'loading': '提交中...',
    'init': '注册/登录'
};

const LoginBox: React.FC<IProps> = props => {

    const { status, error, onSubmit, onNeedCheckUsername, onQuit } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const submit = () => {
        onSubmit && onSubmit({
            username, password
        });
    };

    const handleUsernameBlur = () => {
        onNeedCheckUsername && onNeedCheckUsername(username);
    };

    const disabled = status === 'init' || status === 'loading' || !password || !username;

    return (
        <div className={styles.loginPage} onClick={onQuit} onKeyDown={e => e.keyCode===13&&!disabled&&submit()}>
            <div className={styles.loginBox} onClick={e => e.stopPropagation()}>
                <div className={styles.loginForm}>
                    <input placeholder='用户名' type='text' value={username} onBlur={handleUsernameBlur} onChange={handleUsernameChange} />
                    <p className={styles.warning}>{tip[status]}</p>
                    <input placeholder='密码' type='password' value={password} onChange={handlePasswordChange} />
                    <p className={styles.warning}>{error}</p>
                    <button disabled={disabled} onClick={submit}>{ buttonContent[status] }</button>
                </div>
                <p className={styles.thirdPartyLogin}>
                    <span>第三方登录</span>
                    <span><img src={WeixinIcon} alt='weixin' />微信</span>
                    <span><img src={QQIcon} alt='qq' />QQ</span>
                </p>
            </div>
        </div>
    );
}

export default LoginBox;