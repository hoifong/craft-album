import React, { useEffect } from 'react';
import styles from './index.module.sass';
import TopNav from './containers/TopNav';
import Banner from './containers/Banner';
import Progress from './containers/Progress';
import LeftArrow from './containers/LeftArrow';
import RightArrow from './containers/RightArrow';
import LoginBox from './containers/LoginBox';
import Trash from './containers/Trash';
import { connect } from 'react-redux';
import { fetchPhotos } from '../../store/banner';
import { fetchUser } from '../../store/user';

interface IProps {
    fetchData: () => void
}

const mapDispatchToProps= (dispatch: Function) => ({
    fetchData: () => {
        dispatch(fetchUser());
        dispatch(fetchPhotos());
    }
})

const Home: React.FC<IProps> = props => {

    

    useEffect(props.fetchData, []);

    return (
        <div className={styles.home}>
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