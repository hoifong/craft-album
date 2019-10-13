import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Displayer from '../components/Login';
import { User } from '../../../api/types';
import { login } from '../../../api';

const LoginContainer: React.FC<RouteComponentProps> = props => {

    const { history } = props;

    const handlerSubmit = (user: User) => {
        login(user)
            .then(() => {
                history.push('/');
            })
            .catch((e) => {
                console.log(e.message || e);
                alert('登陆失败');
            })
    }

    return <Displayer onSubmit={handlerSubmit} />;
}

export default withRouter(LoginContainer);