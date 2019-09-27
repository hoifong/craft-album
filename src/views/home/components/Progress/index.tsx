import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.sass';

interface ProgressProps {
    total: number,
    current: number,    //  1-total
    onChange?: (index: number) => void
}

const errorRange = 0.5;

const Progress: React.FC<ProgressProps> = props => {

    const {current, total, onChange} = props;

    const sliderRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    const [sliderOffset, setOffset] = useState('0');

    const setSlider = () => {
        let initOffset;
        if (current >= total) {
            initOffset = '99%' ;
        } else if (current <= 0) {
            initOffset = '0';
        } else {
            initOffset = Math.floor(100*current/total) + '%';
        }
        setOffset(initOffset);
    }

    useEffect(setSlider, [current]);

    //  点击进度条
    const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {

        if (!barRef.current) {
            return;
        }

        if (onChange) {
            const barLen = barRef.current.clientWidth;
            const space = barLen / (total);
            const offset = e.clientX - barRef.current.offsetLeft;
            const offsetIndex = Math.floor(offset/space + errorRange);
            if (offsetIndex !== current) {
                onChange(offsetIndex);
            }
        }
    }

    const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {

        //  clientX拖拽结束时会为0
        if (!barRef.current || e.clientX <= 0) {
            return;
        }
        const offset = e.screenX - barRef.current.offsetLeft;
        setOffset(offset+'px');
    }

    //  结束拖拽时需重设滑块位置
    const handleDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!barRef.current) {
            return;
        }
        const barLen = barRef.current.clientWidth;
        const space = barLen / (total);
        const offset = e.clientX - barRef.current.offsetLeft;
        const offsetIndex = Math.floor(offset/space + errorRange);

        if (offsetIndex === current) {
            setSlider();
        } else if (onChange) {
            onChange(offsetIndex);
        }
    }

    return (
        <div className={styles.progress}>
            <div className={styles.bar} ref={barRef} onClick={handleChange}>
                <div
                    className={styles.slider}
                    ref={sliderRef}
                    style={{ left: sliderOffset }}
                    draggable
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    onClick={e => e.stopPropagation()}
                    >
                </div>
            </div>
        </div>
    )
}

export default Progress;