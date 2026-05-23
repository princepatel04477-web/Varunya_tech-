import { useCallback, useRef } from 'react';
import anime from '@/lib/anime-utils';

export function useTiltAnime<T extends HTMLElement>(maxTilt = 12) {
  const elRef = useRef<T | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const refCallback = useCallback((el: T | null) => {
    // Clean up previous event listeners if elements or props change
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    elRef.current = el;
    if (!el) return;

    // Skip tilt effects entirely on mobile screens under 768px
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      anime({
        targets: el,
        rotateY: x * maxTilt,
        rotateX: -y * maxTilt,
        duration: 200,
        easing: 'easeOutQuad',
      });

      const shimmer = el.querySelector('.card-shimmer') as HTMLElement;
      if (shimmer) {
        shimmer.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(59,130,246,0.15) 0%, transparent 70%)`;
      }
    };

    const handleLeave = () => {
      anime({
        targets: el,
        rotateY: 0,
        rotateX: 0,
        duration: 600,
        easing: 'easeOutElastic(1, 0.4)',
      });

      const shimmer = el.querySelector('.card-shimmer') as HTMLElement;
      if (shimmer) {
        shimmer.style.background = 'transparent';
      }
    };

    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    
    cleanupRef.current = () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [maxTilt]);

  return refCallback;
}
