import React, { useEffect, useReducer, useState } from 'react';
import { Photo } from '../../../../api/types';
import styles from './index.module.sass';
import Image from '../Image';
import AddPhoto from '../../containers/AddPhoto';
import cn from 'classnames';
// import { BANNER_SLIDE_SPEED } from '../../../../utils/consts';

interface BannerProps {
    photos: Photo[],
    showIndex: number
}

interface BannerState {
    current: number,
    move: 'left'|'right'|'',
    textVisible: boolean,
    left: number,
    right: number
}

const initialState: (current: number) => BannerState = current => ({
    current: current,
    left: -1,//-1代表左边图片为左侧相邻的图片，否则为指定idx的图片
    right: -1,
    move: '',
    textVisible: false
});

const BannerReducer: React.Reducer<BannerState, any> = (state, action) => {
    switch(action.type) {
        case 'moveLeft': 
            return {
                ...state,
                move: 'left'
            };
        case 'moveRight':
            return {
                ...state,
                move: 'right'
            };
        case 'setCurrent':
            return initialState(action.current);
        case 'setLeft':
            return {
                ...state,
                left: action.left
            };
        case 'setRight':
            return {
                ...state,
                right: action.right
            };
        case 'toggleTextVisible':
            return {
                ...state,
                textVisible: !state.textVisible
            }
        default:
            return state;
    }
}

const Banner1: React.FC<BannerProps> = props => {
    const { showIndex, photos } = props;
    const [ state, dispatch ] = useReducer<React.Reducer<BannerState, any>, number>(BannerReducer, showIndex, initialState);
    const [ nextShowIndex, setNextShowIndex] = useState(-1);
    const { current, left, right, textVisible, move } = state;

    const slideLeft = () => {
        if (current <= 0) {
            return;
        }

        dispatch({ type: 'moveLeft' });
        setTimeout(() => {
            //  动画完成后重置状态
            dispatch({
                type: 'setCurrent',
                current: showIndex
            });
        }, 1200);   //滑动时间
    }

    const slideRight = () => {
        if (current >= photos.length) {
            return;
        }

        dispatch({ type: 'moveRight' });
        setTimeout(() => {
            dispatch({
                type: 'setCurrent',
                current: showIndex
            });
        }, 1200);

    }

    const handleCurrent = () => {
        if (showIndex === current) {
            return;
        }
        if (showIndex < current) {
            dispatch({
                type: 'setLeft',
                left: showIndex
            })
            slideLeft();
        } else {
            dispatch({
                type: 'setRight',
                right: showIndex
            });
            slideRight();
        }
    }

    const handleNext = () => {
        //  上一动画结束时开始下一动画
        if (nextShowIndex !== -1 && !move) {
            setNextShowIndex(-1);
            handleShowIndexChange();
        }
    }

    const handleShowIndexChange = () => {
        if (!state.move) {
            handleCurrent();
        } else {
            setNextShowIndex(showIndex);
        }
    }

    useEffect(handleShowIndexChange, [showIndex]);
    useEffect(handleNext, [move]);

    const lastPhoto = photos.length ? photos[photos.length-1].photoId : '';

    const containerStyle = cn([styles.content, {
        [styles.slideLeft]: move === 'left',
        [styles.slideRight]: move === 'right'
    }])

    return (
        <div className={styles.banner}>
            <div className={containerStyle}>
                <section>
                    { current > 0 && <Image showText={false} photo={photos[left !== -1 ? left : (current - 1)]} /> }
                </section>
                <section>
                    {
                        current !== photos.length
                            ? <Image onClick={() => dispatch({type: 'toggleTextVisible'})} showText={textVisible} photo={photos[current]} />
                            : <AddPhoto  bgUrl={lastPhoto} />
                    }
                </section>
                <section>
                    {
                        right === photos.length || current === photos.length - 1
                            ? <AddPhoto bgUrl={lastPhoto} />
                            : current < photos.length - 1
                                ? <Image showText={false} photo={photos[right !== -1 ? right : (current + 1)]} />
                                : null
                    }
                </section>
            </div>
            
        </div>
    );
}

export default Banner1;