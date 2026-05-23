import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ParticleField from '@/components/ParticleField';

const metrics = [
  'AI Automation',
  'SaaS Platforms',
  'Custom AI Tools',
  'Full Stack Systems',
  '3D Experiences',
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Neural glow orb canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const w = canvas.width;
      const h = canvas.height;
      const t = performance.now() * 0.001;

      ctx.clearRect(0, 0, w, h);

      // Core glow
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.25;

      // Outer glow rings
      for (let i = 0; i < 3; i++) {
        const grd = ctx.createRadialGradient(
          cx + Math.sin(t * 0.5 + i) * 20,
          cy + Math.cos(t * 0.3 + i) * 20,
          0,
          cx,
          cy,
          r * (1.2 + i * 0.3)
        );
        grd.addColorStop(0, `rgba(255, 170, 51, ${0.15 - i * 0.04})`);
        grd.addColorStop(0.5, `rgba(0, 229, 255, ${0.08 - i * 0.02})`);
        grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }

      // Inner core
      const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.5);
      coreGrd.addColorStop(0, 'rgba(255, 200, 100, 0.3)');
      coreGrd.addColorStop(0.5, 'rgba(255, 170, 51, 0.15)');
      coreGrd.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrd;
      ctx.fillRect(0, 0, w, h);

      // Rotating ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.2);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 170, 51, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([10, 20]);
      ctx.stroke();
      ctx.restore();

      // Second ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.15);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.75, 0, Math.PI * 1.5);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.setLineDash([15, 25]);
      ctx.stroke();
      ctx.restore();
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
    )
      .fromTo(
        subtitleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
        '-=0.7'
      )
      .fromTo(
        descRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        metricsRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Particle Background */}
      <ParticleField />

      {/* Neural Glow Orb Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-32">
          {/* Left: Typography */}
          <div className="flex flex-col justify-center">
            <div ref={titleRef} className="mb-4">
              <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] font-light leading-[0.9] tracking-[-0.03em] text-soft-white opacity-90">
                VARUNYA
              </h1>
            </div>
            <div ref={subtitleRef} className="mb-8">
              <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-soft-white">
                TECHNOLOGIES
              </h2>
            </div>

            <p
              ref={descRef}
              className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-lg mb-10"
            >
              Varunya Technologies creates next-generation AI systems, scalable SaaS platforms,
              intelligent automation tools, and immersive digital experiences designed for the future.
            </p>

            {/* Floating Metrics */}
            <div ref={metricsRef} className="flex flex-wrap gap-3">
              {metrics.map((metric) => (
                <div
                  key={metric}
                  className="glass-panel px-4 py-2 rounded-full text-xs tracking-wider uppercase text-muted-foreground hover:text-amber hover:border-amber/20 transition-all duration-300"
                  data-cursor-hover
                >
                  {metric}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating Interface Stack */}
          <div className="hidden lg:flex items-center justify-center relative perspective-1000">
            <div className="relative w-[400px] h-[500px] preserve-3d">
              {/* Card 1 - Back */}
              <div
                className="absolute inset-0 glass-panel rounded-2xl p-6 animate-float"
                style={{
                  animationDelay: '0s',
                  transform: 'translateZ(-60px) rotateY(-5deg) rotateX(3deg)',
                  opacity: 0.5,
                }}
              >
                <div className="h-full flex flex-col gap-4">
                  <div className="h-2 w-20 bg-amber/30 rounded-full" />
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-8 rounded bg-white/5" />
                    ))}
                  </div>
                  <div className="flex-1 rounded-lg bg-gradient-to-br from-amber/10 to-cyan/5" />
                </div>
              </div>

              {/* Card 2 - Middle */}
              <div
                className="absolute inset-0 glass-panel rounded-2xl p-6 animate-float"
                style={{
                  animationDelay: '-2s',
                  transform: 'translateZ(-30px) rotateY(3deg) rotateX(-2deg)',
                  opacity: 0.7,
                }}
              >
                <div className="h-full flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-16 bg-cyan/30 rounded-full" />
                    <div className="h-2 w-8 bg-white/10 rounded-full" />
                  </div>
                  <div className="flex-1 rounded-lg bg-gradient-to-tr from-cyan/10 to-transparent flex items-end p-4">
                    <div className="w-full flex items-end gap-1">
                      {[40, 65, 45, 80, 55, 70, 50, 85, 60].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-cyan/30 to-cyan/10"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Front */}
              <div
                className="absolute inset-0 glass-panel rounded-2xl p-6 animate-float"
                style={{
                  animationDelay: '-4s',
                  transform: 'translateZ(0px) rotateY(-2deg) rotateX(1deg)',
                }}
              >
                <div className="h-full flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber to-amber/50" />
                    <div>
                      <div className="h-2 w-24 bg-white/20 rounded-full mb-1" />
                      <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                    </div>
                  </div>
                  <div className="flex-1 rounded-lg bg-gradient-to-br from-amber/5 to-cyan/5 p-4 flex flex-col gap-3">
                    <div className="h-1.5 w-full bg-white/5 rounded-full" />
                    <div className="h-1.5 w-3/4 bg-white/5 rounded-full" />
                    <div className="h-1.5 w-5/6 bg-white/5 rounded-full" />
                    <div className="mt-auto flex gap-2">
                      <div className="flex-1 h-16 rounded bg-amber/10" />
                      <div className="flex-1 h-16 rounded bg-cyan/10" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                    <span>SYS.ACTIVE</span>
                    <span className="text-amber">99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #050505, transparent)',
        }}
      />
    </section>
  );
}
