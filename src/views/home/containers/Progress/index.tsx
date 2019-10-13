import React from 'react';
import { MapDispatchToProps, MapStateToProps, connect } from 'react-redux';
import Displayer from '../../components/Progress';
import { StoreState } from '../../../../store';
import { slideTo } from '../../../../store/banner';

interface IMapStateToProps {
    total: number,
    current: number
}

interface IMapDispatchToProps {
    slideTo: (index: number) =>  void
}

const mapStateToProps: MapStateToProps<IMapStateToProps, {}, StoreState> = state => ({
    total: state.banner.photos.length,
    current: state.banner.showIndex
});

const mapDispatchToProps: MapDispatchToProps<IMapDispatchToProps, {}> = dispatch => ({
    slideTo: (index: number) => dispatch(slideTo(index))
});

const Wrapper: React.FC<IMapStateToProps & IMapDispatchToProps> = props => {
    const { total, current, slideTo } = props;

    return total > 0 ? <Displayer total={total} current={current} onChange={slideTo} /> : null;
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);