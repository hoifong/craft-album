import Displayer from '../../components/Banner';
import { Photo } from '../../../../api/types';
import { MapStateToProps, connect } from 'react-redux';
import { StoreState } from '../../../../store';

interface IMapStateToProps {
    showIndex: number,
    photos: Photo[]
}

const mapStateToProps: MapStateToProps<IMapStateToProps, {}, StoreState> = state => ({
    showIndex: state.banner.showIndex,
    photos: state.banner.photos
});

export default connect(mapStateToProps)(Displayer);