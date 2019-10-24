import React, { useEffect } from 'react';
import styles from './index.module.sass';
import Banner from './containers/Banner';
import {
    LoginBox,
    TopNav,
    LeftArrow,
    RightArrow,
    Progress,
    Trash
} from './lazyLoad';
import { connect } from 'react-redux';
import { fetchPhotos } from '../../store/banner';
import { fetchUser } from '../../store/user';
import { showControllerInTime } from '../../store/controller';

interface IProps {
    fetchData: () => void,
    showController: () => void
}

const mapDispatchToProps= (dispatch: Function) => ({
    fetchData: () => {
        dispatch(fetchUser());
        dispatch(fetchPhotos());
    },
    showController: () => {
        dispatch(showControllerInTime());
    }
})

const Home: React.FC<IProps> = props => {

    const { fetchData, showController } = props;

    useEffect(fetchData, []);

    return (
        <div className={styles.home} onMouseMove={showController}>
            <LoginBox/>
            <TopNav />
            <LeftArrow />
            <RightArrow />
            <Banner />
            <Progress />
            <Trash />
        </div>
    )
}

export default connect(undefined, mapDispatchToProps)(Home);