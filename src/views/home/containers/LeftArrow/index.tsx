import React from 'react';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import Displayer from '../../components/Arrow';
import { StoreState } from '../../../../store';
import { slideLeft } from '../../../../store/banner';

interface IMapStateToProps {
    current: number,
    visible: boolean
}

interface IMapDispatchToProps {
    slideLeft: () => {}
}

const mapStateToProps: MapStateToProps<IMapStateToProps, {}, StoreState> = state => ({
    current: state.banner.showIndex,
    visible: state.controller.arrow
});

const mapDispatchToProps: MapDispatchToProps<IMapDispatchToProps, {}> = dispatch => ({
    slideLeft: () => dispatch(slideLeft())
});

const Wrapper: React.FC<IMapStateToProps & IMapDispatchToProps> = props => {
    const { current, slideLeft, visible } = props;
    return current > 0 ? <Displayer direct='left' hide={!visible} onClick={slideLeft} /> : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);