import React, { useState } from 'react';
import { MapStateToProps, connect } from 'react-redux';
import * as apis from '../../../../api';
import Displayer, { STATUS } from '../../components/LoginBox';
import { StoreState } from '../../../../store';
import { fetchUser } from '../../../../store/user';
import { fetchPhotos } from '../../../../store/banner';
import { hideLoginbox } from '../../../../store/loginbox';
import { User } from '../../../../api/types';

interface IMapStateToProps {
    show: boolean
}

interface IMapDispatchToProps {
    fetchUser: () => void
    fetchPhotos: () => void
    hideLoginbox: () => void
}

const mapStateToProps: MapStateToProps<IMapStateToProps, {}, StoreState> = state => ({
    show: state.loginbox
});

const mapDispatchToProps = (dispatch: Function) => ({
    fetchUser: () => dispatch(fetchUser()),
    fetchPhotos: () => dispatch(fetchPhotos()),
    hideLoginbox: () => dispatch(hideLoginbox())
});

const Wrapper: React.FC<IMapStateToProps & IMapDispatchToProps> = props => {

    const { show, fetchUser, fetchPhotos, hideLoginbox } = props;

    const [status, setStatus] = useState<STATUS>('init');
    const [error, setError] = useState('');

    const checkUsername = (username: string) => {
        if (!username) {
            return;
        }
        setStatus('init');
        apis.checkUsername(username)
            .then(() => {
                setStatus('reged');
            })
            .catch(() => {
                setStatus('unreged');
            });
    }

    const handleSubmit = (form: User) => {
        let handler = null;
        
        if (status === 'reged') {
            handler = apis.login(form);
        }
        if (status === 'unreged') {
            handler = apis.register(form)
                .then(() => {
                    return apis.login(form);
                });
        }

        if (handler) {
            const lastStatus = status;
            setStatus('loading');
            handler.then(() => {
                setError('');
                fetchUser();
                fetchPhotos();
                quitLoginBox();
            }).catch(e => {
                setError(e.message || e);
                setStatus(lastStatus);
            });
        }
    }

    const quitLoginBox = () => {
        hideLoginbox();
        setError('');
        setStatus('init');
    }

    return show ? <Displayer status={status} error={error} onNeedCheckUsername={checkUsername} onSubmit={handleSubmit} onQuit={quitLoginBox} /> : null;
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);