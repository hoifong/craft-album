import React, { useState } from 'react';
import { register } from '../../api';

const Register: React.FC = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick  = () => {
        register({ username, password })
            .then(() => {
                alert("注册成功");
            })
            .catch(() => {
                alert("注册失败");
            })
    }

    return (
        <div>
            <input value={username} onChange={e => setUsername(e.target.value)} />
            <input value={password} type='password' onChange={e => setPassword(e.target.value)} />
            <button onClick={handleClick}>注册</button>
        </div>
    )
}

export default Register;