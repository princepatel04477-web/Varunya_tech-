'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTiltAnime } from '@/hooks/useTiltAnime';
import AnimatedHeading from '@/components/AnimatedHeading';
import StaggerParagraph from '@/components/StaggerParagraph';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: '01',
    name: 'Shiveshwar Textiles',
    category: '3D Landing Page',
    image: 'https://placehold.co/800x450/090F17/3B82F6?text=Shiveshwar+Textiles',
    description: 'Luxury editorial website with animated 3D fabric textures and scroll-driven storytelling.',
    tags: 'Next.js · Three.js · GSAP · Framer Motion',
  },
  {
    index: '02',
    name: 'Tradly',
    category: 'Fintech Platform',
    image: 'https://placehold.co/800x450/090F17/3B82F6?text=Tradly',
    description: 'Real-time trading analytics dashboard with immersive 3D command center UI and live market data.',
    tags: 'Next.js · FastAPI · Three.js · Supabase',
  },
  {
    index: '03',
    name: 'Varunya Technologies',
    category: 'Agency Website',
    image: 'https://placehold.co/800x450/090F17/3B82F6?text=Varunya+Technologies',
    description: 'This very site — scroll-linked canvas animation, AI-powered brand identity, and sub-second load times.',
    tags: 'Next.js 14 · Framer Motion · HTML5 Canvas · Vercel',
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

// Cinematic Desktop Project Card
function HorizontalProjectCard({ project }: ProjectCardProps) {
  const tiltRef = useTiltAnime<HTMLDivElement>(6);

  return (
    <article
      ref={tiltRef}
      className="group relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-[1200px] w-full mx-auto"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Left Column: Case Study Typography */}
      <div className="flex-1 text-left relative z-10" style={{ transform: 'translateZ(40px)' }}>
        {/* Monospace index */}
        <div className="font-mono text-xs font-bold tracking-[0.3em] text-[#3B82F6] mb-4 flex items-center gap-3">
          <span>[ {project.index} ]</span>
          <span className="h-px w-8 bg-[#3B82F6]/30" />
          <span className="uppercase tracking-[0.15em] text-[#64748B]">{project.category}</span>
        </div>

        {/* Massive case study name */}
        <h3 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight group-hover:text-[#3B82F6] transition-colors duration-300">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm lg:text-base text-[#64748B] leading-relaxed max-w-md mb-8">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-8 border-t border-white/[0.04] pt-6 max-w-md">
          {project.tags.split(' · ').map((tag, idx) => (
            <span
              key={idx}
              className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider text-muted-foreground hover:text-white hover:border-white/20 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Elite CTA Link */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase text-white hover:text-[#3B82F6] font-mono transition-colors duration-300"
        >
          <span>Initiate Experience</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="transform group-hover:translate-x-1.5 transition-transform duration-300"
          >
            <path
              d="M1 6H11M11 6L6 1M11 6L6 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Right Column: Dynamic Thumbnail Mask */}
      <div
        className="flex-1 w-full lg:w-auto relative aspect-video rounded-2xl overflow-hidden border border-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        style={{ transform: 'translateZ(20px)' }}
      >
        {/* Dynamic cursor shimmer tracked by hook */}
        <div className="card-shimmer absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10" />

        <img
          src={project.image}
          alt={`Screenshot of ${project.name} — ${project.description}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          width={800}
          height={450}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>
    </article>
  );
}

// Responsive Touch-friendly Mobile Card
function VerticalProjectCard({ project }: ProjectCardProps) {
  const ref = useTiltAnime<HTMLDivElement>(6);

  return (
    <article
      ref={ref}
      className="group relative rounded-2xl p-5 border border-white/[0.04] bg-[#0C111A] overflow-hidden flex flex-col justify-between"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="card-shimmer absolute inset-0 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />

      <div style={{ transform: 'translateZ(20px)' }}>
        {/* Thumbnail aspect-video */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-6">
          <img
            src={project.image}
            alt={`Screenshot of ${project.name} — ${project.description}`}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
            width={800}
            height={450}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="font-mono text-[9px] tracking-wider text-[#3B82F6] uppercase mb-2">
          {project.category}
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#3B82F6] transition-colors">
          {project.name}
        </h3>

        <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div style={{ transform: 'translateZ(10px)' }} className="border-t border-white/[0.04] pt-4 mt-auto">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-mono text-white group-hover:text-[#3B82F6] transition-colors"
        >
          <span>Initiate Experience</span>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="transform group-hover:translate-x-1 transition-transform">
            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Pinned Horizontal Scroll on Desktop
  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const track = document.querySelector('.horizontal-track') as HTMLElement;
      if (!track) return;

      const scrollWidth = track.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -amountToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${amountToScroll}`,
          invalidateOnRefresh: true,
        },
      });

      // Background Horizontal Crawler Text
      gsap.to('.crawler-text', {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-title-mobile projects-title-desktop"
      className={`relative overflow-hidden bg-[#05070A] ${isMobile ? 'py-[60px] px-5' : 'h-screen'}`}
    >
      {/* Background outlined text crawler linked to scroll (Obys Style) */}
      {!isMobile && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none z-0 opacity-[0.03] whitespace-nowrap">
          <div className="crawler-text font-display text-[22vw] font-black text-transparent stroke-outline tracking-wider uppercase inline-block">
            Varunya Intel · Autonomous Design · Premium Experience ·
          </div>
        </div>
      )}

      {/* Style block for text outlining */}
      <style>{`
        .stroke-outline {
          -webkit-text-stroke: 1.5px white;
        }
      `}</style>

      {isMobile ? (
        // Mobile Layout: Vertical list with cinematic elements
        <div className="relative z-10 max-w-[1400px] mx-auto px-0 md:px-[max(16px,4vw)]">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#3B82F6]/50" />
              <span className="text-xs tracking-[0.1em] md:tracking-[0.3em] uppercase text-[#3B82F6] font-mono">
                Portfolio
              </span>
            </div>
            <AnimatedHeading
              id="projects-title-mobile"
              text="Selected Work"
              className="text-[clamp(22px,5vw,36px)] font-bold mb-4"
            />
            <StaggerParagraph
              text="A few systems we have designed and built recently."
              className="text-[#64748B]"
            />
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
            {projects.map((project, idx) => (
              <VerticalProjectCard key={project.name} project={project} index={idx} />
            ))}
          </div>
        </div>
      ) : (
        // Desktop Pinned Horizontal Track
        <div className="h-full flex items-center relative z-10">
          
          {/* Static Heading fixed in top-left gutter */}
          <div className="absolute top-16 left-10 lg:left-20 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#3B82F6]/40" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#3B82F6] font-mono">
                Case Studies
              </span>
            </div>
            <h2 id="projects-title-desktop" className="font-display text-2xl font-bold text-white tracking-tight">
              Selected Work
            </h2>
          </div>

          {/* Sticky horizontal track container */}
          <div className="horizontal-track flex items-center pl-[25vw] pr-[20vw] gap-[20vw] h-[80vh]">
            {projects.map((project, idx) => (
              <div key={project.name} className="flex-shrink-0 w-[80vw] lg:w-[65vw] h-full flex items-center justify-center">
                <HorizontalProjectCard project={project} index={idx} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
