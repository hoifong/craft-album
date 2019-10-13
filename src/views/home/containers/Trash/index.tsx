import React from 'react';
import Displayer from '../../components/Trash'
import { Photo } from '../../../../api/types';
import { connect } from 'react-redux';
import { StoreState } from '../../../../store';
import { toggleLoading } from '../../../../store/loading';
import { fetchPhotos } from '../../../../store/banner';
import { deletePhoto } from '../../../../api';

interface IMapStateToProps {
    current: number
    photos: Photo[]
}

interface IMapDispatchToProps {
    toggleLoading: () => void
    fetchPhotos: () => void
}

const mapStateToProps = (state: StoreState) => ({
    current: state.banner.showIndex,
    photos: state.banner.photos
});

const mapDispatchToProps = (dispatch: Function) => ({
    toggleLoading: () => dispatch(toggleLoading()),
    fetchPhotos: () => dispatch(fetchPhotos())
})

const Wrapper: React.FC<IMapStateToProps & IMapDispatchToProps> = props => {
    const { current, photos, toggleLoading, fetchPhotos } = props;

    const handleClick = () => {
        toggleLoading();
        const photoId = photos[current].photoId;
        deletePhoto({photoId})
            .then(() => {
                fetchPhotos();
            })
            .catch((e) => {
                console.log(e.message || e);
            })
            .finally(() => {
                toggleLoading();
            });
    }

    return current < photos.length ? <Displayer onClick={handleClick} /> : null;
}

export default connect<IMapStateToProps, IMapDispatchToProps, any, any>(mapStateToProps, mapDispatchToProps)(Wrapper);