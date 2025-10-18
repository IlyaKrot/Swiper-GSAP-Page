import React, { useRef, useState, useEffect } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { TimelineProps } from '@/feature/timeline/model/types';
import { CirclePoints } from '../CirclePoints/CirclePoints';
import { EventsSlider } from '../EventsSlider/EventsSlider';
import { useAnimatedYears } from '../../../lib/hooks/useAnimatedYears';
import styles from './Timeline.module.scss';
import { useRotation } from '../../../lib/hooks/useRotation';

const Timeline: React.FC<TimelineProps> = ({ data, title = 'Исторические даты' }) => {
  const [activePeriodIndex, setActivePeriodIndex] = useState(0);
  const eventSwiperRef = useRef<SwiperType | null>(null);
  const rotation = useRotation();

  const { years, animateYears, setInstant } = useAnimatedYears(
    data[0].period.startYear,
    data[0].period.endYear
  );

  useEffect(() => {
    setInstant(data[0].period.startYear, data[0].period.endYear);
  }, []);

  const handleChangePeriod = (newIndex: number) => {
    const prevPeriod = data[activePeriodIndex]?.period;
    const nextPeriod = data[newIndex]?.period;

    if (prevPeriod && nextPeriod) {
      animateYears(prevPeriod.startYear, nextPeriod.startYear, prevPeriod.endYear, nextPeriod.endYear);
    }

    setActivePeriodIndex(newIndex);
    eventSwiperRef.current?.slideTo(0);
  };

  const activePeriod = data[activePeriodIndex];

  return (
    <div className={styles.timeline}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.years}>
              <span className={styles.yearStart}>{years.start}</span>
              <span className={styles.yearEnd}>{years.end}</span>
            </div>
          </div>
          <CirclePoints
            data={data}
            activeIndex={activePeriodIndex}
            onChangePeriod={handleChangePeriod}
            rotation={rotation}
          />
        </div>

        <EventsSlider
          events={activePeriod.events}
          onInit={(swiper) => (eventSwiperRef.current = swiper)}
          rotation={rotation}
        />
      </div>
    </div>
  );
};

export default Timeline;