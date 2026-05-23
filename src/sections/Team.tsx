import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: 'ARYAN KANANI',
    role: 'Founder \u0026 Marketing Head',
    image: '/images/Aryan_Image.jpeg',
    description:
      'Leading brand strategy, digital growth, marketing systems, and business expansion for the next generation of AI products.',
    accent: '#FFAA33',
  },
  {
    name: 'PRINCE PATEL',
    role: 'Co-Founder \u0026 Developer',
    image: '/images/Prince_Patel.jpeg',
    description:
      'Engineering intelligent systems, immersive digital products, AI experiences, and high-performance scalable applications.',
    accent: '#00E5FF',
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ambient particles
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

    const particles: Array<{
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.2,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 170, 51, ${p.alpha})`;
        ctx.fill();
      });
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Spotlight effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,170,51,0.04) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-amber/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-amber font-mono">
              Leadership
            </span>
            <div className="h-px w-12 bg-amber/50" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-soft-white mb-6">
            THE PEOPLE BEHIND VARUNYA
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Two founders. One vision. Building the next generation of intelligent technology.
          </p>
        </div>

        {/* Founder Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="group relative glass-panel rounded-3xl overflow-hidden hover-lift"
              data-cursor-hover
              style={{
                borderColor: `${founder.accent}15`,
              }}
            >
              {/* Neon border glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${founder.accent}30, 0 0 40px ${founder.accent}15`,
                }}
              />

              {/* Portrait */}
              <div className="relative h-80 lg:h-96 overflow-hidden">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />

                {/* Floating particles overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full animate-pulse-glow"
                      style={{
                        backgroundColor: founder.accent,
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`,
                        animationDelay: `${i * 0.3}s`,
                        boxShadow: `0 0 10px ${founder.accent}60`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 lg:p-8">
                <div
                  className="text-[10px] tracking-[0.3em] uppercase font-mono mb-3"
                  style={{ color: founder.accent }}
                >
                  {founder.role}
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-soft-white mb-4 tracking-tight">
                  {founder.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {founder.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
