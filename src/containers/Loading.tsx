import React from 'react';
import Loading from '../components/Loading';
import { MapStateToProps, connect } from 'react-redux';
import { StoreState } from '../store';

interface IProps {
    show: boolean
}

const mapStateToProps: MapStateToProps<IProps, {}, StoreState> = state => ({
    show: state.loading
});

const Wrapper: React.FC<IProps> = props => {
    return props.show ? <Loading /> : null;
}

export default connect(mapStateToProps)(Wrapper);