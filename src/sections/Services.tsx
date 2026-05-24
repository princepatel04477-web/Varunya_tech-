'use client';

import { useEffect, useRef } from 'react';
import {
  Brain,
  Bot,
  Globe,
  Smartphone,
  Box,
  Workflow,
  Building2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import anime, { staggerReveal } from '@/lib/anime-utils';
import { useTiltAnime } from '@/hooks/useTiltAnime';
import ServiceGridLines from '@/components/ServiceGridLines';
import AnimatedHeading from '@/components/AnimatedHeading';
import StaggerParagraph from '@/components/StaggerParagraph';

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  category?: string;
  stat?: string;
  tag?: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Modern, high-performance web apps built with React, Next.js, and cutting-edge frontend technologies.',
    gradient: 'from-[#10B981]/12 to-[#10B981]/3',
  },
  {
    icon: Box,
    title: '3D Interactive Websites',
    description: 'Immersive WebGL experiences with real-time 3D graphics, particle systems, and spatial interactions.',
    gradient: 'from-[#10B981]/12 to-[#10B981]/3',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Cross-platform mobile apps with native performance, beautiful UI, and seamless user experiences.',
    gradient: 'from-[#3B82F6]/12 to-[#3B82F6]/3',
  },
  {
    icon: Brain,
    title: 'AI SaaS Platforms',
    description: 'End-to-end AI-powered SaaS platforms with intelligent automation, real-time analytics, and scalable cloud architecture.',
    gradient: 'from-[#3B82F6]/12 to-[#3B82F6]/3',
  },
  {
    icon: Workflow,
    title: 'Intelligent Automation',
    description: 'AI-driven workflow automation systems that streamline operations and eliminate manual processes.',
    gradient: 'from-[#10B981]/12 to-[#10B981]/3',
  },
  {
    icon: Bot,
    title: 'AI Chatbots & Agents',
    description: 'Conversational AI systems with natural language processing, context awareness, and multi-channel deployment.',
    gradient: 'from-[#3B82F6]/12 to-[#3B82F6]/3',
  },
  {
    icon: Sparkles,
    title: 'AI Integrations',
    description: 'Seamless integration of AI services, APIs, and machine learning models into existing platforms.',
    gradient: 'from-[#3B82F6]/12 to-[#3B82F6]/3',
  },
  {
    icon: Building2,
    title: 'Enterprise Systems',
    description: 'Scalable enterprise-grade systems with robust security, multi-tenancy, and advanced data architecture.',
    gradient: 'from-[#10B981]/12 to-[#10B981]/3',
  },
  {
    icon: TrendingUp,
    category: 'DIGITAL MARKETING',
    title: 'Growth Marketing',
    description: "SEO, paid ads, social media strategy, and conversion optimization — all data-driven and ROI-focused. We don't just run campaigns, we build growth systems.",
    stat: '3x average ROI delivered',
    tag: 'MARKETING',
    gradient: 'from-[#F59E0B]/12 to-[#F59E0B]/3',
  },
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useTiltAnime<HTMLDivElement>(10);
  const Icon = service.icon;
  const isLarge = index === 0 || index === 3;

  return (
    <div
      ref={ref}
      className={`service-card group relative z-10 rounded-2xl p-5 lg:p-8 cursor-pointer transition-all duration-500 opacity-0 bg-[#0C111A] border border-white/[0.04] overflow-hidden ${
        isLarge ? 'lg:col-span-2' : ''
      }`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      data-cursor-hover
    >
      {/* Dynamic Cursor Shimmer Overlay */}
      <div className="card-shimmer absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

      {/* Shifting Gradient Background */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Optional Tag Badge */}
      {service.tag && (
        <span className="absolute top-6 right-6 text-[10px] tracking-[0.2em] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full border border-[#F59E0B]/20 z-20">
          {service.tag}
        </span>
      )}

      <div
        className="relative z-10 flex flex-col justify-between h-full"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div>
          {/* Optional Category */}
          {service.category && (
            <span className="text-[10px] tracking-[0.15em] font-mono text-[#F59E0B] mb-3 block uppercase font-semibold">
              {service.category}
            </span>
          )}

          {/* Icon with dynamic hover rotation */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 group-hover:from-white/20 group-hover:to-white/5 transition-all duration-500 group-hover:rotate-[12deg]">
            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors duration-500" />
          </div>

          {/* Heading with 3D translation */}
          <h3 className="font-display text-lg font-semibold text-soft-white mb-3 tracking-tight group-hover:translate-y-[-2px] transition-transform duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed group-hover:translate-y-[-2px] transition-transform duration-300">
            {service.description}
          </p>

          {/* Optional Stat Metric */}
          {service.stat && (
            <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground/60 font-mono uppercase tracking-wider">Key Metric</span>
              <span className="text-xs font-semibold text-[#F59E0B] font-mono">{service.stat}</span>
            </div>
          )}
        </div>

        {/* Tactile Arrow CTA */}
        <div className="mt-6 flex items-center gap-2 text-xs text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-all duration-500 font-mono translate-y-2 group-hover:translate-y-0">
          <span>EXPLORE</span>
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
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to animate grid lines and service cards on viewport entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate decorative SVG lines
            anime({
              targets: '.grid-line',
              strokeDashoffset: [anime.setDashoffset, 0],
              duration: 1400,
              delay: anime.stagger(200),
              easing: 'easeInOutSine',
              complete: () => {
                // Trigger cards stagger once lines are drawn
                staggerReveal('.service-card');
              },
            });

            // Animate intersection dots
            anime({
              targets: '.grid-dot',
              opacity: [0, 1],
              scale: [0, 1],
              delay: anime.stagger(100, { start: 600 }),
              duration: 400,
              easing: 'easeOutBack',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="relative py-[60px] px-5 md:py-32 lg:py-40 md:px-0 overflow-hidden"
      style={{ backgroundColor: '#05070A' }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-0 md:px-6 lg:px-[max(16px,4vw)]">
        {/* Section Header */}
        <div ref={headingsContainerRef} className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#3B82F6]/50" />
            <span className="text-xs tracking-[0.1em] md:tracking-[0.3em] uppercase text-[#3B82F6] font-mono">
              Capabilities
            </span>
          </div>
          <AnimatedHeading
            id="services-title"
            text="WHAT WE BUILD"
            className="text-[clamp(22px,5vw,36px)] font-bold leading-[1] tracking-[-0.02em] mb-6"
          />
          <StaggerParagraph
            text="From intelligent AI systems to immersive digital experiences — we engineer technology that defines the future."
            className="text-lg max-w-xl text-[#64748B]"
          />
        </div>

        {/* Bento Grid */}
        <div
          ref={cardsRef}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {/* SVG Grid Lines Backdrop */}
          <ServiceGridLines />

          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
