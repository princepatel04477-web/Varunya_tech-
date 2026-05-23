import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
    };

    const onEnterInteractive = () => {
      isHoveringRef.current = true;
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(255, 170, 51, 0.6)';
    };

    const onLeaveInteractive = () => {
      isHoveringRef.current = false;
      ring.style.width = '0px';
      ring.style.height = '0px';
      ring.style.borderColor = 'rgba(255, 170, 51, 0)';
    };

    let raf: number;
    const animate = () => {
      const p = posRef.current;
      p.x += (p.targetX - p.x) * 0.15;
      p.y += (p.targetY - p.y) * 0.15;
      dot.style.transform = `translate(${p.x - 2}px, ${p.y - 2}px)`;
      ring.style.transform = `translate(${p.x - 20}px, ${p.y - 20}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: '#FFAA33',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'screen',
          boxShadow: '0 0 10px rgba(255,170,51,0.6), 0 0 20px rgba(255,170,51,0.3)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          borderRadius: '50%',
          border: '1px solid rgba(255, 170, 51, 0)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
      />
    </>
  );
}
