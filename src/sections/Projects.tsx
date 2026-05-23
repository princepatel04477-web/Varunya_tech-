import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'AI Analytics Dashboard',
    category: 'AI Platform',
    image: '/images/project-ai-analytics.jpg',
    description: 'Real-time neural analytics with predictive intelligence',
  },
  {
    title: 'AI Video Generator',
    category: 'Generative AI',
    image: '/images/project-ai-video.jpg',
    description: 'Next-gen video synthesis with deep learning models',
  },
  {
    title: 'Smart CRM Platform',
    category: 'SaaS Product',
    image: '/images/project-crm.jpg',
    description: 'AI-powered customer relationship intelligence',
  },
  {
    title: 'Automation Ecosystem',
    category: 'Enterprise',
    image: '/images/project-automation.jpg',
    description: 'End-to-end intelligent workflow automation',
  },
  {
    title: 'AI Voice Assistant',
    category: 'Conversational AI',
    image: '/images/project-voice.jpg',
    description: 'Natural language processing voice interface',
  },
  {
    title: '3D Brand Experience',
    category: 'Immersive Web',
    image: '/images/project-3d.jpg',
    description: 'Spatial computing brand environment',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="projects"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div ref={headingRef} className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-cyan/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-cyan font-mono">
              Selected Work
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-soft-white mb-6">
            OUR WORK
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            A curated showcase of AI systems, platforms, and immersive experiences
            we have engineered for forward-thinking partners.
          </p>
        </div>

        {/* Project Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                aspectRatio: index === 0 || index === 3 ? '16/10' : '4/3',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-hover
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Chromatic aberration effect on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: hoveredIndex === index ? 0.15 : 0,
                  background:
                    'linear-gradient(45deg, rgba(255,0,0,0.1) 0%, transparent 30%, transparent 70%, rgba(0,0,255,0.1) 100%)',
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-amber font-mono">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-display text-xl lg:text-2xl font-semibold text-soft-white mb-1 tracking-tight group-hover:text-glow-amber transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {project.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
