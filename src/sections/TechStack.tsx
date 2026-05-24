'use client';

import { useEffect, useRef } from 'react';
import anime from '@/lib/anime-utils';

const row1 = [
  { name: 'Next.js',       cat: 'FRAMEWORK',       logo: '/icons/nextjs.svg' },
  { name: 'React',         cat: 'UI LIBRARY',      logo: '/icons/react.svg' },
  { name: 'Three.js',      cat: '3D GRAPHICS',     logo: '/icons/threejs.svg' },
  { name: 'TypeScript',    cat: 'LANGUAGE',        logo: '/icons/typescript.svg' },
  { name: 'Tailwind CSS',  cat: 'STYLING',         logo: '/icons/tailwindcss.svg' },
  { name: 'Framer Motion', cat: 'ANIMATION',       logo: '/icons/framermotion.svg' },
  { name: 'Node.js',       cat: 'RUNTIME',         logo: '/icons/nodejs.svg' },
  { name: 'Python',        cat: 'LANGUAGE',        logo: '/icons/python.svg' },
];

const row2 = [
  { name: 'FastAPI',       cat: 'BACKEND',         logo: '/icons/fastapi.svg' },
  { name: 'Supabase',      cat: 'DATABASE',        logo: '/icons/supabase.svg' },
  { name: 'PostgreSQL',    cat: 'DATABASE',        logo: '/icons/postgresql.svg' },
  { name: 'Docker',        cat: 'DEVOPS',          logo: '/icons/docker.svg' },
  { name: 'Vercel',        cat: 'DEPLOYMENT',      logo: '/icons/vercel.svg' },
  { name: 'PyTorch',       cat: 'AI / ML',         logo: '/icons/pytorch.svg' },
  { name: 'GSAP',          cat: 'ANIMATION',       logo: '/icons/gsap.svg' },
  { name: 'GitHub',        cat: 'VERSION CONTROL', logo: '/icons/github.svg' },
];

const invertLogos = ['GitHub', 'Vercel'];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.ts-header > *',
              opacity: [0, 1],
              translateY: [24, 0],
              delay: anime.stagger(100),
              duration: 600,
              easing: 'easeOutExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const doubleRow1 = [...row1, ...row1];
  const doubleRow2 = [...row2, ...row2];

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      aria-labelledby="tech-stack-title"
      className="relative py-[60px] px-5 md:py-[80px] md:px-0 overflow-hidden"
      style={{ backgroundColor: '#080D14' }}
    >
      {/* Injecting infinite marquee keyframes and state styles */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: scroll-left 32s linear infinite;
        }
        .marquee-track-right {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: scroll-right 28s linear infinite;
        }
        .marquee-parent:hover .marquee-track-left,
        .marquee-parent:hover .marquee-track-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Edge gradient overlays */}
      <div className="absolute top-0 bottom-0 left-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-[#080D14] to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-[#080D14] to-transparent" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* SECTION HEADER */}
        <div className="ts-header text-center flex flex-col items-center mb-16 px-9">
          <div className="flex items-center gap-3 mb-4 opacity-0">
            <div className="h-[1px] w-[40px] bg-[#1E3A5F]" />
            <span className="text-[11px] tracking-[0.1em] lg:tracking-[0.18em] uppercase text-[#3B82F6] font-mono font-semibold">
              Tech Stack
            </span>
            <div className="h-[1px] w-[40px] bg-[#1E3A5F]" />
          </div>
          <h2 id="tech-stack-title" className="text-[clamp(22px,5vw,32px)] font-semibold text-[#F1F5F9] mb-4 opacity-0 leading-tight">
            Built with the best tools on the planet
          </h2>
          <p className="text-[#475569] text-[14px] leading-relaxed max-w-[480px] opacity-0 text-center">
            Every technology we use is chosen for performance, scalability, and developer experience — no bloat, no compromise.
          </p>
        </div>

        {/* MARQUEE PARENT CONTAINER */}
        <div role="region" aria-label="Technology stack" className="marquee-parent w-full flex flex-col gap-4 overflow-hidden py-2 select-none">
          {/* Row 1: Scrolling Left */}
          <div className="w-full overflow-hidden">
            <div className="marquee-track-left">
              {doubleRow1.map((pill, idx) => (
                <div
                  key={`r1-${pill.name}-${idx}`}
                  className="flex items-center gap-2.5 bg-[#0D1520] border border-[#1E293B] hover:border-[#3B82F6] hover:bg-[#111D2E] rounded-[10px] px-3 py-2 md:px-4 md:py-2.5 transition-colors duration-200 cursor-pointer"
                >
                  <img
                    src={pill.logo}
                    alt={`${pill.name} logo`}
                    width={24}
                    height={24}
                    sizes="24px"
                    className="w-5 h-5 md:w-6 md:h-6 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    style={invertLogos.includes(pill.name) ? { filter: 'invert(1)' } : undefined}
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[12px] md:text-[13px] font-medium text-[#CBD5E1] tracking-tight leading-normal">
                      {pill.name}
                    </span>
                    <span className="text-[10px] text-[#334155] tracking-[0.08em] font-bold font-mono">
                      {pill.cat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="w-full overflow-hidden">
            <div className="marquee-track-right">
              {doubleRow2.map((pill, idx) => (
                <div
                  key={`r2-${pill.name}-${idx}`}
                  className="flex items-center gap-2.5 bg-[#0D1520] border border-[#1E293B] hover:border-[#3B82F6] hover:bg-[#111D2E] rounded-[10px] px-3 py-2 md:px-4 md:py-2.5 transition-colors duration-200 cursor-pointer"
                >
                  <img
                    src={pill.logo}
                    alt={`${pill.name} logo`}
                    width={24}
                    height={24}
                    sizes="24px"
                    className="w-5 h-5 md:w-6 md:h-6 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    style={invertLogos.includes(pill.name) ? { filter: 'invert(1)' } : undefined}
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[12px] md:text-[13px] font-medium text-[#CBD5E1] tracking-tight leading-normal">
                      {pill.name}
                    </span>
                    <span className="text-[10px] text-[#334155] tracking-[0.08em] font-bold font-mono">
                      {pill.cat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
