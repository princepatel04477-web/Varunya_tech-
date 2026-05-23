import { useCallback, useRef } from 'react';
import anime from '@/lib/anime-utils';

export function useMagneticAnime<T extends HTMLElement>(strength = 0.35) {
  const elRef = useRef<T | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const refCallback = useCallback((el: T | null) => {
    // If there is an existing cleanup, run it first
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    elRef.current = el;
    if (!el) return;

    // Skip magnetic effects entirely on mobile screens under 768px
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      
      anime({
        targets: el,
        translateX: dx,
        translateY: dy,
        duration: 300,
        easing: 'easeOutQuad',
      });
    };

    const handleLeave = () => {
      anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: 500,
        easing: 'easeOutElastic(1, 0.5)',
      });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    
    cleanupRef.current = () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return refCallback;
}
