import React, { useState } from 'react';
import { login } from '../../api';

const PageLogin: React.FC = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick  = () => {
        login({ username, password })
            .then((res) => {
                console.log(res);
            })
            .catch(() => {
                console.log("登录失败");
            })
    }

    return (
        <div>
            <input value={username} onChange={e => setUsername(e.target.value)} />
            <input value={password} type='password' onChange={e => setPassword(e.target.value)} />
            <button onClick={handleClick}>登录</button>
        </div>
    )
}

export default PageLogin;