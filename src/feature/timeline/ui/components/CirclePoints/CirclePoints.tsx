import React, { useEffect, useCallback } from 'react';
import { TimeSegment } from '@/feature/timeline/model/types';
import styles from './CirclePoints.module.scss';
import clsx from 'clsx';

interface Props {
  data: TimeSegment[];
  activeIndex: number;
  onChangePeriod: (index: number) => void;
  rotation: ReturnType<typeof import('@/feature/timeline/lib/hooks/useRotation').useRotation>;
}

export const CirclePoints: React.FC<Props> = ({ data, activeIndex, onChangePeriod, rotation }) => {
  const { rotationAngle, currentRotation, rotateAnimation, circleRef } = rotation;

  const calculatePointPosition = (index: number, total: number, radius = 265) => {
    const angle = (360 / total) * index - 90;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    return { x, y };
  };

  const setActivePeriod = useCallback(
    (newIndex: number, newRotation: number) => {
      rotateAnimation(newRotation);
      onChangePeriod(newIndex);
    },
    [rotateAnimation, onChangePeriod]
  );

  const rotateCircle = (direction: 'next' | 'prev') => {
    const total = data.length;
    const stepAngle = 360 / total;
    let newIndex: number;
    let newRotation: number;

    if (direction === 'next') {
      newIndex = (activeIndex + 1) % total;
      newRotation = currentRotation.current - stepAngle;
    } else {
      newIndex = (activeIndex - 1 + total) % total;
      newRotation = currentRotation.current + stepAngle;
    }

    setActivePeriod(newIndex, newRotation);
  };

  const rotateToIndex = (targetIndex: number) => {
    const total = data.length;
    const stepAngle = 360 / total;
    let stepsForward = (targetIndex - activeIndex + total) % total;
    if (stepsForward === 0 && targetIndex !== activeIndex) {
      stepsForward = total;
    }

    const newRotation = currentRotation.current - stepsForward * stepAngle;
    setActivePeriod(targetIndex, newRotation);
  };

  const handlePointClick = (index: number) => {
    if (index !== activeIndex) rotateToIndex(index);
  };

  useEffect(() => {
    rotateAnimation(currentRotation.current);
  }, []);

  return (
    <div className={styles.circleWrapper}>
      <div className={styles.circle} ref={circleRef}>
        {data.map((segment, index) => {
          const pos = calculatePointPosition(index, data.length);
          const isActive = index === activeIndex;
          return (
            <button
              key={`${segment.period.startYear}-${segment.period.endYear}`}
              className={clsx(styles.circlePoint, isActive && styles.active)}
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                transform: `translate(-50%, -50%) rotate(${-rotationAngle}deg)`,
              }}
              onClick={() => handlePointClick(index)}
            >
              <span className={styles.circleYear}>{index + 1}</span>
              <div className={styles.circleTitle}>{segment.period.title}</div>
            </button>
          );
        })}
      </div>

      <div className={styles.slider}>
        <div className={styles.sliderHeader}>
          <span>
            0{activeIndex + 1}/0{data.length}
          </span>
        </div>

        <div className={styles.navigation}>
          <button className={styles.navigationBtn} onClick={() => rotateCircle('prev')}>
            {'<'}
          </button>
          <button className={styles.navigationBtn} onClick={() => rotateCircle('next')}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};