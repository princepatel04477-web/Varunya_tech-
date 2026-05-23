import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from '@/lib/anime-utils';
import { useTiltAnime } from '@/hooks/useTiltAnime';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Shiveshwar Textiles',
    category: '3D Landing Page',
    image: 'https://placehold.co/800x450/0F172A/3B82F6?text=Shiveshwar+Textiles',
    description: 'Luxury editorial website with animated 3D fabric textures and scroll-driven storytelling.',
    tags: 'Next.js · Three.js · GSAP · Framer Motion',
  },
  {
    name: 'Tradly',
    category: 'Fintech Platform',
    image: 'https://placehold.co/800x450/0F172A/3B82F6?text=Tradly',
    description: 'Real-time trading analytics dashboard with immersive 3D command center UI and live market data.',
    tags: 'Next.js · FastAPI · Three.js · Supabase',
  },
  {
    name: 'Varunya Technologies',
    category: 'Agency Website',
    image: 'https://placehold.co/800x450/0F172A/3B82F6?text=Varunya+Technologies',
    description: 'This very site — scroll-linked canvas animation, AI-powered brand identity, and sub-second load times.',
    tags: 'Next.js 14 · Framer Motion · HTML5 Canvas · Vercel',
  },
];

interface ProjectCardProps {
  project: {
    name: string;
    category: string;
    image: string;
    description: string;
    tags: string;
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  const tiltRef = useTiltAnime<HTMLDivElement>(12);

  return (
    <div
      ref={tiltRef}
      className="project-card group relative glass-panel rounded-2xl overflow-hidden hover-lift transition-all duration-500 flex flex-col h-full bg-void border border-white/5 hover:border-white/10 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] opacity-0"
      data-cursor-hover
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Card Shimmer Overlay */}
      <div
        className="card-shimmer"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          transition: 'background 0.1s',
          zIndex: 1,
        }}
      />

      {/* Thumbnail Container (16:9 Aspect Ratio, lazy loaded) */}
      <div className="relative aspect-video w-full overflow-hidden bg-void">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          width={800}
          height={450}
        />
        {/* Visual Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        {/* Project Category Tag (Glows Electric Blue on hover) */}
        <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#3B82F6] mb-3 group-hover:text-[#4DA3FF] group-hover:[text-shadow:0_0_20px_rgba(59,130,246,0.8)] transition-all duration-300">
          {project.category}
        </span>

        {/* Project Name */}
        <h3 className="font-display text-xl lg:text-2xl font-bold text-soft-white mb-2 tracking-tight group-hover:text-amber transition-colors duration-300">
          {project.name}
        </h3>

        {/* 1-Line Description */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Tags Row */}
        <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground/60 mb-6 border-t border-white/5 pt-4">
          {project.tags.split(' · ').map((tag, idx) => (
            <span
              key={idx}
              className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] uppercase tracking-wider text-muted-foreground/80 hover:text-soft-white hover:border-white/20 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Project Link */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-amber hover:text-white font-mono transition-colors duration-300 mt-auto"
        >
          <span>View Project</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="transform group-hover:translate-x-1 transition-transform duration-300"
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
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance animation
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // IntersectionObserver to animate project cards on viewport entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.project-card',
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.96, 1],
              delay: anime.stagger(150),
              duration: 700,
              easing: 'easeOutExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle grid accent background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">
        {/* Section Header */}
        <div ref={headingRef} className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-cyan/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-cyan font-mono">
              Portfolio
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-soft-white mb-6">
            Selected Work
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            A few things we've built recently
          </p>
        </div>

        {/* Project Card Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
