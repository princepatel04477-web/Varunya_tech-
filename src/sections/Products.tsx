import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  PenTool,
  Workflow,
  MessageSquare,
  BarChart3,
  GitBranch,
  Lightbulb,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    icon: PenTool,
    title: 'AI Content Generator',
    tag: 'GENERATIVE AI',
    description: 'Create high-quality content, copy, and creative assets with advanced language models.',
    metric: '10M+ words generated',
  },
  {
    icon: Workflow,
    title: 'AI Automation Suite',
    tag: 'AUTOMATION',
    description: 'End-to-end workflow automation with intelligent decision-making capabilities.',
    metric: '500+ workflows automated',
  },
  {
    icon: MessageSquare,
    title: 'AI Customer Assistant',
    tag: 'CONVERSATIONAL AI',
    description: '24/7 intelligent customer support with natural language understanding.',
    metric: '99.7% resolution rate',
  },
  {
    icon: BarChart3,
    title: 'AI Analytics Engine',
    tag: 'ANALYTICS',
    description: 'Real-time predictive analytics with neural-powered insights and forecasting.',
    metric: '50+ data sources',
  },
  {
    icon: GitBranch,
    title: 'AI Workflow System',
    tag: 'ORCHESTRATION',
    description: 'Visual workflow builder with AI-powered optimization and monitoring.',
    metric: '1M+ tasks processed',
  },
  {
    icon: Lightbulb,
    title: 'AI Business Intelligence',
    tag: 'INTELLIGENCE',
    description: 'Strategic AI insights for data-driven decision making and growth.',
    metric: '200+ enterprises served',
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

      // Horizontal scroll
      const track = trackRef.current;
      if (track) {
        const getScrollDistance = () =>
          Math.max((track.scrollWidth - window.innerWidth + 200) * 1.35, 0);

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: track,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Entrance animation for cards
        const cards = track.querySelectorAll('.product-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
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
    <section ref={sectionRef} id="products" className="relative overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 lg:pt-40">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-neon-violet/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-neon-violet font-mono">
              AI Products
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-soft-white mb-6">
            AI PRODUCT SUITE
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            A comprehensive suite of AI-powered products designed to transform
            how businesses operate and grow.
          </p>
        </div>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="flex gap-6 pl-6 lg:pl-10 pr-[50vw] py-8"
        style={{ width: 'max-content' }}
      >
        {products.map((product, index) => {
          const Icon = product.icon;
          const isEven = index % 2 === 0;
          return (
            <div
              key={product.title}
              className="product-card group relative w-[380px] lg:w-[420px] flex-shrink-0 glass-panel rounded-3xl p-8 hover-lift"
              style={{
                marginTop: isEven ? '0' : '40px',
              }}
              data-cursor-hover
            >
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-violet/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 group-hover:from-neon-violet/20 group-hover:to-neon-violet/5 transition-all duration-500">
                  <Icon className="w-6 h-6 text-muted-foreground group-hover:text-neon-violet transition-colors duration-500" />
                </div>

                {/* Tag */}
                <div className="text-[10px] tracking-[0.3em] uppercase text-neon-violet font-mono mb-3">
                  {product.tag}
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-semibold text-soft-white mb-4 tracking-tight">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Metric */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-violet animate-pulse-glow" />
                  <span className="text-xs text-muted-foreground font-mono">
                    {product.metric}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
