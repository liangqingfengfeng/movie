import { useEffect } from 'react';

export function useIntersectionObserver(target: any, callback: any, threshold = 0.1) {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold,
    });
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      observer.unobserve(target.current);
    };
  }, [target]);
}
