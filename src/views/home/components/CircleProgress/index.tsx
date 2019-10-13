import React from 'react';
import styles from './index.module.sass';

interface IProps {
    size?: number
    ringSize?: number
    percent?: number
}

const CircleProgress: React.FC<IProps> = props => {
    const { size=220, ringSize=20, percent=0 } = props;
    const radius = size/2 - ringSize;

    const round = Math.PI * 2 * 170;

    const realPercent = Math.min(Math.max(0, percent), 100)/100;

    return (
        <div className={styles.circleProgress}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    cx={size/2}
                    cy={size/2}
                    r={radius}
                    strokeWidth={ringSize}
                    stroke="#FFFFFF"
                    strokeOpacity="0.3"
                    fill="none"/>
                <circle
                    cx={size/2}
                    cy={size/2}
                    r={radius}
                    strokeWidth={ringSize}
                    stroke="#FFFFFF" 
                    fill="none"
                    transform={`matrix(0,-1,1,0,0,${size})`}
                    strokeDasharray={ `${round*realPercent} ${round}` } />
            </svg>
            <h6 className={styles.percentage} style={{ lineHeight: size+'px' }}>{percent+'%'}</h6>
        </div>
    )
}

export default CircleProgress;