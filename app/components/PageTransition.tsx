'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import anime from '@/lib/anime-utils';

export default function PageTransition() {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = curtainRef.current;
    if (!el) return;
    
    const tl = anime.timeline({ easing: 'easeInOutQuart' });
    
    tl
      .add({
        targets: el,
        scaleY: [0, 1],
        transformOrigin: ['50% 100%', '50% 100%'],
        duration: 400,
      })
      .add({
        targets: el,
        scaleY: [1, 0],
        transformOrigin: ['50% 0%', '50% 0%'],
        duration: 400,
        delay: 100,
      });
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 bg-[#3B82F6] z-[9999] pointer-events-none origin-bottom"
      style={{ transform: 'scaleY(0)' }}
    />
  );
}
