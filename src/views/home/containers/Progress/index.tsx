import React from 'react';
import { MapDispatchToProps, MapStateToProps, connect } from 'react-redux';
import Displayer from '../../components/Progress';
import { StoreState } from '../../../../store';
import { slideTo } from '../../../../store/banner';

interface IMapStateToProps {
    total: number,
    current: number,
    visible: boolean
}

interface IMapDispatchToProps {
    slideTo: (index: number) =>  void
}

const mapStateToProps: MapStateToProps<IMapStateToProps, {}, StoreState> = state => ({
    total: state.banner.photos.length,
    current: state.banner.showIndex,
    visible: state.controller.progress
});

const mapDispatchToProps: MapDispatchToProps<IMapDispatchToProps, {}> = dispatch => ({
    slideTo: (index: number) => dispatch(slideTo(index))
});

const Wrapper: React.FC<IMapStateToProps & IMapDispatchToProps> = props => {
    const { total, current, slideTo, visible } = props;

    return total > 0 ? <Displayer total={total} hide={!visible} current={current} onChange={slideTo} /> : null;
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);