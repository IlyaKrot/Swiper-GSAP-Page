import { useState, useCallback } from 'react';
import gsap from 'gsap';

export const useAnimatedYears = (initialStart: number, initialEnd: number) => {
  const [years, setYears] = useState({ start: initialStart, end: initialEnd });

  const animateYears = useCallback((fromStart: number, toStart: number, fromEnd: number, toEnd: number) => {
    const obj = { start: fromStart, end: fromEnd };
    gsap.killTweensOf(obj);
    gsap.to(obj, {
      start: toStart,
      end: toEnd,
      duration: 0.8,
      ease: 'power1.out',
      onUpdate: () => {
        setYears({ start: Math.round(obj.start), end: Math.round(obj.end) });
      },
    });
  }, []);

  const setInstant = (start: number, end: number) => setYears({ start, end });

  return { years, animateYears, setInstant } as const;
};