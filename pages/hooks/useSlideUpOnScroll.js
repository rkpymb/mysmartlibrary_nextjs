// hooks/useSlideUpOnScroll.js
import { useEffect, useRef } from 'react';

const useSlideUpOnScroll = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check scroll direction
            const isScrollingDown = entry.boundingClientRect.y < entry.rootBounds.y;
            const isScrollingUp = entry.boundingClientRect.y > entry.rootBounds.y;

            // Add appropriate animation class
            if (isScrollingDown) {
              entry.target.classList.remove('slideDown');
              entry.target.classList.add('slideUp');
            } else if (isScrollingUp) {
              entry.target.classList.remove('slideUp');
              entry.target.classList.add('slideDown');
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return elementsRef;
};

export default useSlideUpOnScroll;
