'use client';
import { useRef, useEffect } from 'react';

interface Props {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function AnimeCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 1800,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const element: HTMLSpanElement = el;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        observer.disconnect();

        // DO NOT use anime() here — v4 removed the 'round' shorthand
        // and animating arbitrary object props is unreliable cross-version.
        // Use a plain requestAnimationFrame counter instead — zero deps, always works.

        const startTime = performance.now();
        const startVal = 0;

        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // easeOutExpo curve
          const ease =
            progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

          const current = Math.round(startVal + (target - startVal) * ease);
          element.textContent = prefix + current + suffix;

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            element.textContent = prefix + target + suffix;

            // optional: pulse the parent stat card when done
            const card = element.closest('.stat-card') as HTMLElement;
            if (card) {
              card.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
              card.style.transform = 'scale(1.05)';
              setTimeout(() => { card.style.transform = 'scale(1)'; }, 300);
            }
          }
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, suffix, prefix, duration]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
