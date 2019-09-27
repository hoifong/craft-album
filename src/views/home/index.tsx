import React from 'react';
import styles from './index.module.sass';
import TopNav from './components/TopNav';
import Banner from './components/Banner';
import Progress from './components/Progress';
import Arrow from './components/Arrow';
import { Photo } from '../../api/types';
import Trash from './components/Trash';

const testData: Photo[] =[
    {
        originUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569329164416&di=31a2d3380402c45b10dbad21ee03bd86&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201411%2F07%2F20141107110900_T28sQ.jpeg',
        text: '在一个月黑风高的夜晚1'
    },
    {
        originUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569266419280&di=5c9c5cadd55594ec9a3dddad8baea8ed&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201504%2F10%2F212319n261fg7e4eeuw2xt.jpg',
        text: '在一个月黑风高的夜晚2'
    },
    {
        originUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569334099073&di=771823ff86ec2f783b70f973ed2332b0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201411%2F07%2F20141107110907_k4YmG.jpeg',
        text: '在一个月黑风高的夜晚3'
    },
    {
        originUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569465180933&di=1c7915abb8ace58b20d724281a33963e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F06%2F20150406H4242_PMB5S.jpeg',
        text: '在一个月黑风高的夜晚4'
    },
    {
        originUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569334159516&di=2b29f4200b0ffc08472abe81c7e26b8b&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1207%2F09%2Fc1%2F12275680_1341814069052.jpg',
        text: '在一个月黑风高的夜晚5'
    }
];

interface HomeState {
    current: number,
    data: Photo[]
}

class Home extends React.Component<any, HomeState> {
    state = {
        current: 0,
        data: testData
    }
    handleBarClick = (index: number) => {
        this.setState({
            current: index
        });
    }
    handleGoLeft = () => {
        this.setState({
            current: this.state.current - 1
        })
    }
    handleGoRight = () => {
        this.setState({
            current: this.state.current + 1
        })
    }
    render() {
        const { current, data } = this.state;
        return (
            <div className={styles.home}>
                <TopNav />
                {current > 0 && <Arrow direct='left' onClick={this.handleGoLeft} />}
                {current < data.length && <Arrow direct='right' onClick={this.handleGoRight} />}
                <Banner photos={data} showIndex={current} />
                {data.length > 0 && <Progress total={data.length} current={current} onChange={this.handleBarClick} />}
                <Trash />
            </div>
        )
    }
}

export default Home;