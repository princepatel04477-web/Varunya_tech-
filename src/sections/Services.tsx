import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Brain,
  Bot,
  Globe,
  Smartphone,
  Box,
  Workflow,
  Building2,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Brain,
    title: 'AI SaaS Platforms',
    description: 'End-to-end AI-powered SaaS platforms with intelligent automation, real-time analytics, and scalable cloud architecture.',
    gradient: 'from-amber/20 to-amber/5',
  },
  {
    icon: Workflow,
    title: 'Intelligent Automation',
    description: 'AI-driven workflow automation systems that streamline operations and eliminate manual processes.',
    gradient: 'from-cyan/20 to-cyan/5',
  },
  {
    icon: Bot,
    title: 'AI Chatbots \u0026 Agents',
    description: 'Conversational AI systems with natural language processing, context awareness, and multi-channel deployment.',
    gradient: 'from-neon-violet/20 to-neon-violet/5',
  },
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Modern, high-performance web apps built with React, Next.js, and cutting-edge frontend technologies.',
    gradient: 'from-electric-blue/20 to-electric-blue/5',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Cross-platform mobile apps with native performance, beautiful UI, and seamless user experiences.',
    gradient: 'from-amber/20 to-amber/5',
  },
  {
    icon: Box,
    title: '3D Interactive Websites',
    description: 'Immersive WebGL experiences with real-time 3D graphics, particle systems, and spatial interactions.',
    gradient: 'from-cyan/20 to-cyan/5',
  },
  {
    icon: Sparkles,
    title: 'AI Integrations',
    description: 'Seamless integration of AI services, APIs, and machine learning models into existing platforms.',
    gradient: 'from-neon-violet/20 to-neon-violet/5',
  },
  {
    icon: Building2,
    title: 'Enterprise Systems',
    description: 'Scalable enterprise-grade systems with robust security, multi-tenancy, and advanced data architecture.',
    gradient: 'from-electric-blue/20 to-electric-blue/5',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
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
      id="services"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div ref={headingRef} className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-amber/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-amber font-mono">
              Capabilities
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-soft-white mb-6">
            WHAT WE BUILD
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            From intelligent AI systems to immersive digital experiences — we engineer
            technology that defines the future.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLarge = index === 0 || index === 3;
            return (
              <div
                key={service.title}
                className={`group relative glass-panel rounded-2xl p-6 lg:p-8 hover-lift cursor-pointer transition-all duration-500 ${
                  isLarge ? 'lg:col-span-2' : ''
                }`}
                data-cursor-hover
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 group-hover:from-amber/20 group-hover:to-amber/5 transition-all duration-500">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-amber transition-colors duration-500" />
                  </div>

                  <h3 className="font-display text-lg font-semibold text-soft-white mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs text-amber opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-mono">
                    <span>EXPLORE</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 6H11M11 6L6 1M11 6L6 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
