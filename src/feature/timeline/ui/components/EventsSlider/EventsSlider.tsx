import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { TimelineEvent } from '@/feature/timeline/model/types';
import styles from './EventsSlider.module.scss';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  events: TimelineEvent[];
  onInit?: (swiper: SwiperType) => void;
  rotation: ReturnType<typeof import('@/feature/timeline/lib/hooks/useRotation').useRotation>;
}

export const EventsSlider: React.FC<Props> = ({ events, onInit, rotation }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const { isRotating } = rotation;

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.params.navigation) {
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className={clsx(styles.eventsSlider, !isRotating && styles.eventsActive)}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={3}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          onInit?.(swiper);
        }}
      >
        {events.map((event, idx) => (
          <SwiperSlide key={`event-${idx}`}>
            <div className={styles.slide}>
              <div className={styles.slideDate}>{event.date}</div>
              <div className={styles.slideDescription}>{event.description}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button ref={prevRef} className={clsx(styles.eventsNavBtn, styles.eventPrev)}>{'<'}</button>
      <button ref={nextRef} className={clsx(styles.eventsNavBtn, styles.eventNext)}>{'>'}</button>
    </div>
  );
};