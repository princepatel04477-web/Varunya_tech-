import { useEffect, useRef, useState } from 'react';
import ParticleField from '@/components/ParticleField';
import anime from '@/lib/anime-utils';
import { useMagneticAnime } from '@/hooks/useMagneticAnime';

const metrics = [
  'AI Automation',
  'SaaS Platforms',
  'Custom AI Tools',
  'Full Stack Systems',
  '3D Experiences',
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const primaryCtaRef = useMagneticAnime<HTMLAnchorElement>(0.3);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Anime.js entrance animations
  useEffect(() => {
    const tl = anime.timeline({ easing: 'easeOutExpo', duration: 800 });

    tl
      .add({
        targets: '.hero-eyebrow',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
      })
      .add({
        targets: '.hero-headline .word',
        opacity: [0, 1],
        translateY: [60, 0],
        rotateX: [90, 0],
        delay: anime.stagger(80),
        duration: 700,
      }, '-=200')
      .add({
        targets: '.hero-subtext',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
      }, '-=400')
      .add({
        targets: '.hero-cta-primary, .hero-cta-secondary',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.95, 1],
        delay: anime.stagger(100),
        duration: 500,
      }, '-=300')
      .add({
        targets: '.hero-metric',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(60),
        duration: 500,
      }, '-=300');

    return () => {
      tl.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Particle Background */}
      <ParticleField />

      {/* Neural Glow Orb Canvas (Disabled on mobile to ensure zero overflow and smooth performance) */}
      {!isMobile && (
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
      )}

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-32">
          {/* Left: Typography */}
          <div className="flex flex-col justify-center">
            {/* Hero Eyebrow Tagline */}
            <div className="hero-eyebrow mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-amber opacity-0">
              Intelligent Digital Futures
            </div>

            {/* Hero Headline with Staggered Word Reveals */}
            <h1 className="hero-headline font-display text-[clamp(2.3rem,6.5vw,5.2rem)] leading-[0.95] tracking-[-0.03em] text-soft-white flex flex-col gap-1 mb-8 overflow-hidden py-1">
              <span className="block overflow-hidden">
                {"We Build Digital".split(' ').map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-[0.05em]">
                    <span className="word inline-block origin-bottom-left opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                      {word}
                    </span>
                  </span>
                ))}
              </span>
              <span className="block overflow-hidden font-bold">
                {"Experiences That Convert".split(' ').map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-[0.05em]">
                    <span className="word inline-block origin-bottom-left opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            </h1>

            {/* Hero Subtext */}
            <p className="hero-subtext text-muted-foreground text-base lg:text-lg leading-relaxed max-w-lg mb-8 opacity-0">
              From immersive 3D landing pages to AI-powered Micro SaaS products — Varunya Technologies turns ambitious ideas into revenue-generating digital products. Fast.
            </p>

            {/* CTA Buttons (Stack vertically on screens < 480px, horizontal sm+) */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <a
                ref={primaryCtaRef}
                href="#projects"
                className="hero-cta-primary inline-flex items-center justify-center gap-3 py-3 px-6 bg-gradient-to-r from-amber to-amber/80 text-black hover:from-amber/90 hover:to-amber/70 transition-all duration-300 rounded-xl font-display text-sm font-semibold tracking-wider uppercase active:scale-[0.98] shadow-[0_0_20px_rgba(255,170,51,0.25)] hover:shadow-[0_0_30px_rgba(255,170,51,0.4)] w-full sm:w-auto opacity-0"
                data-cursor-hover
                onMouseEnter={(e) => anime({
                  targets: e.currentTarget,
                  scale: 1.04,
                  duration: 200,
                  easing: 'easeOutQuad',
                })}
                onMouseLeave={(e) => anime({
                  targets: e.currentTarget,
                  scale: 1.0,
                  duration: 200,
                  easing: 'easeOutQuad',
                })}
              >
                See Our Work  →
              </a>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-secondary inline-flex items-center justify-center gap-3 py-3 px-6 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-soft-white transition-all duration-300 rounded-xl font-display text-sm tracking-wider uppercase active:scale-[0.98] w-full sm:w-auto opacity-0"
                data-cursor-hover
              >
                Book a Free Strategy Call
              </a>
            </div>

            {/* Floating Metrics */}
            <div className="flex flex-wrap gap-3">
              {metrics.map((metric) => (
                <div
                  key={metric}
                  className="hero-metric glass-panel px-4 py-2 rounded-full text-xs tracking-wider uppercase text-muted-foreground hover:text-amber hover:border-amber/20 transition-all duration-300 opacity-0"
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
