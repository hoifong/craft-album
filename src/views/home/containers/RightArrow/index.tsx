import React from 'react';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import Displayer from '../../components/Arrow';
import { StoreState } from '../../../../store';
import { slideRight } from '../../../../store/banner';

interface IMapStateToProps {
    total: number
    current: number
}

interface IMapDispatchToProps {
    slideRight: () => {}
}

const mapStateToProps: MapStateToProps<IMapStateToProps, {}, StoreState> = state => ({
    current: state.banner.showIndex,
    total: state.banner.photos.length
});

const mapDispatchToProps: MapDispatchToProps<IMapDispatchToProps, {}> = dispatch => ({
    slideRight: () => dispatch(slideRight())
});

const Wrapper: React.FC<IMapStateToProps & IMapDispatchToProps> = props => {
    const { current, total, slideRight } = props;
    return current < total ? <Displayer direct='right' onClick={slideRight} /> : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);