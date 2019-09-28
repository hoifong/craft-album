import React, { useState, useEffect } from 'react';
import { Photo } from '../../../../api/types';
import styles from './index.module.sass';
import Image from '../Image';
import AddPhoto from '../../containers/AddPhoto';

interface BannerProps {
    photos: Photo[],
    showIndex: number
}

const Banner1: React.FC<BannerProps> = props => {
    const { showIndex, photos } = props;
    const [current, setCurrent] = useState(showIndex);
    const [offset, setOffset] = useState(100);
    const [midTextVisible, setMidTextVisible] = useState(false);
    const [leftPhoto, setLeft] = useState(-1);
    const [rightPhoto, setRight] = useState(-1);

    const slideLeft = () => {
        if (current <= 0) {
            return;
        }

        let needOffset = 100;

        const move = () => {

            needOffset -= 2;
            setOffset(needOffset);

            if (needOffset > 0) {
                requestAnimationFrame(move);
            } else {
                setMidTextVisible(false);
                setCurrent(showIndex);
                setLeft(-1);
                setOffset(100);
            }
        }

        requestAnimationFrame(move);
    }

    const slideRight = () => {
        if (current >= photos.length) {
            return;
        }

        let needOffset = 100;

        const move = () => {

            needOffset += 2;
            setOffset(needOffset);

            if (needOffset < 200) {
                requestAnimationFrame(move);
            } else {
                setMidTextVisible(false);
                setCurrent(showIndex);
                setRight(-1);
                setOffset(100);
            }
        }

        requestAnimationFrame(move);
    }

    const handleShowIndexChange = () => {
        if (showIndex === current) {
            return;
        }
        if (showIndex < current) {
            setLeft(showIndex);
            slideLeft();
        } else {
            setRight(showIndex);
            slideRight();
        }
    }

    useEffect(handleShowIndexChange, [showIndex]);

    const lastPhoto = photos.length ? photos[photos.length-1].originUrl : '';

    return (
        <div className={styles.banner}>
            <div className={styles.content} style={{left: `-${offset}%`}}>
                <section>
                    { current > 0 && <Image showText={false} photo={photos[leftPhoto !== -1 ? leftPhoto : (current - 1)]} /> }
                </section>
                <section>
                    {
                        current !== photos.length
                            ? <Image onClick={() => setMidTextVisible(!midTextVisible)} showText={midTextVisible} photo={photos[current]} />
                            : <AddPhoto  bgUrl={lastPhoto} />
                    }
                </section>
                <section>
                    {
                        rightPhoto === photos.length || current === photos.length - 1
                            ? <AddPhoto bgUrl={lastPhoto} />
                            : current < photos.length - 1
                                ? <Image showText={false} photo={photos[rightPhoto !== -1 ? rightPhoto : (current + 1)]} />
                                : null
                        // current + 1 < photos.length || rightPhoto !== photos.length
                        // ? <Image showText={textVisible} photo={photos[rightPhoto !== -1 ? rightPhoto : (current + 1)]} /> 
                        // : ((current === photos.length - 1) && <AddPhoto />)
                    }
                </section>
            </div>
            
        </div>
    );
}

export default Banner1;