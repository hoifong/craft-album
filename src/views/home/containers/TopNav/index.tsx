
import React from 'react';
import Displayer from '../../components/TopNav';
import { MapStateToProps, connect, MapDispatchToProps } from 'react-redux';
import { StoreState } from '../../../../store';
import { UserState } from '../../../../store/user';
import { showLoginbox } from '../../../../store/loginbox';

interface IMapStateToProps {
    user: UserState
}

interface IMapDispatchToProps {
    showLoginbox: () => void
}

const Wrapper: React.FC<IMapStateToProps&IMapDispatchToProps> = props => {

    const { user, showLoginbox } = props;

    const handleUserIconClick = () => {
        showLoginbox();
    }

    return <Displayer user={user} onUserIconClick={handleUserIconClick} />
}

const mapStateToProps: MapStateToProps<IMapStateToProps, any, StoreState> = state => ({
    user: state.user
});

const mapDispatchToProps: MapDispatchToProps<IMapDispatchToProps, any> = dispatch => ({
    showLoginbox: () => dispatch(showLoginbox())
})

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);