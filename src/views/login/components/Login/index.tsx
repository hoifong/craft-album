import React, { useState } from 'react';
import { User } from '../../../../api/types';

interface IProps {
    onSubmit?: (user: User) => void
}

const Login: React.FC<IProps> = props => {

    const { onSubmit } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        onSubmit && onSubmit({username, password});
    }

    return (
        <div>
            <input value={username} onChange={e => setUsername(e.target.value)} />
            <input value={password} type='password' onChange={e => setPassword(e.target.value)} />
            <button onClick={handleClick}>登录</button>
        </div>
    );
}

export default Login;