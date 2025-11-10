'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface ScrollAnimateProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const ScrollAnimate = ({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.6 
}: ScrollAnimateProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after animation is triggered
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const baseClasses = `transition-all duration-${Math.round(duration * 1000)} ease-out`;
  const animationClasses = isVisible 
    ? 'opacity-100 scale-100 translate-y-0' 
    : 'opacity-0 scale-95 translate-y-4';

  return (
    <div
      ref={elementRef}
      className={`${baseClasses} ${animationClasses} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimate;