import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export const useRotation = () => {
  const currentRotation = useRef(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const rotateAnimation = useCallback((angle: number) => {
    setIsRotating(true);
    currentRotation.current = angle;

    gsap.killTweensOf(circleRef.current as any);
    gsap.to(circleRef.current, {
      rotation: angle + 30,
      duration: 0.8,
      ease: 'power1.out',
      transformOrigin: '50% 50%',
      onUpdate: () => {
        const current = gsap.getProperty(circleRef.current, 'rotation') as number;
        setRotationAngle(current);
      },
      onComplete: () => setIsRotating(false),
    });
  }, [circleRef]);

  return { rotationAngle, isRotating, currentRotation, rotateAnimation, circleRef } as const;
};