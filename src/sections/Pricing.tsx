import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagneticAnime } from '@/hooks/useMagneticAnime';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    label: "For early-stage startups",
    price: "₹15,000",
    features: [
      "Landing Page",
      "Basic SEO Optimization",
      "1 Revision Round",
      "Delivered in 7 days"
    ],
    cta: "Get Started",
    link: "#contact",
    isPopular: false,
    external: false,
  },
  {
    name: "Growth",
    label: "For funded startups & SMEs",
    price: "₹45,000",
    features: [
      "Everything in Starter +",
      "3D Interactions & WebGL",
      "Custom Animations & GSAP",
      "Performance Optimization",
      "3 Revision Rounds",
      "Delivered in 14 days"
    ],
    cta: "Book a Call",
    link: "https://calendly.com",
    isPopular: true,
    external: true,
  },
  {
    name: "Scale",
    label: "For established businesses",
    price: "Custom",
    features: [
      "Everything in Growth +",
      "AI Micro SaaS Integration",
      "Digital Marketing Campaign",
      "Dedicated Project Manager",
      "Ongoing Technical Support"
    ],
    cta: "Let's Talk",
    link: "https://calendly.com",
    isPopular: false,
    external: true,
  }
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const growthBtnRef = useMagneticAnime<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance reveal
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
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

      // Pricing cards stagger entrance
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.98 },
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
      id="pricing"
      className="relative py-32 lg:py-40 overflow-hidden bg-void"
    >
      {/* Dynamic Background Accent Orbs */}
      <div className="absolute -top-40 right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#3B82F6]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        {/* Section Header */}
        <div ref={headingRef} className="mb-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-cyan/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-cyan font-mono">
              Pricing Options
            </span>
            <div className="h-px w-12 bg-cyan/50" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-soft-white mb-6">
            Value Packages
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Transparent starting packages built to establish premium perceived value and fit your project scope.
          </p>
        </div>

        {/* Pricing Cards Horizontal Layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col justify-between hover-lift transition-all duration-500 ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-[#1E293B] to-[#0F172A] border border-[#3B82F6] shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)]'
                  : 'bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-white/10'
              }`}
              data-cursor-hover
            >
              {/* Most Popular Absolute Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3B82F6] text-white text-[10px] font-mono tracking-[0.2em] font-semibold py-1.5 px-4 rounded-full uppercase shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10">
                  Most Popular
                </div>
              )}

              {/* Card Upper Block */}
              <div>
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold text-soft-white tracking-tight mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    {plan.label}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-8">
                  {plan.price !== "Custom" && (
                    <span className="text-xs text-muted-foreground/80 font-mono align-top mr-1">from</span>
                  )}
                  <span className="font-display text-4xl lg:text-5xl font-extrabold text-soft-white tracking-tight">
                    {plan.price}
                  </span>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-4 mb-10 border-t border-white/5 pt-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {/* Custom Electric Blue Glow Checkmark Icon */}
                      <svg
                        className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-soft-white/80 leading-relaxed font-sans">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action Button */}
              <a
                ref={plan.name === 'Growth' ? growthBtnRef : undefined}
                href={plan.link}
                target={plan.external ? "_blank" : undefined}
                rel={plan.external ? "noopener noreferrer" : undefined}
                className={`w-full text-center py-3.5 px-6 rounded-xl font-display text-xs tracking-[0.15em] font-bold uppercase transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-[#3B82F6] hover:bg-[#2563EB] text-white hover:scale-[1.02] shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.55)] active:scale-[0.98]'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-soft-white hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Disclaimer Text */}
        <p className="text-center text-xs text-muted-foreground/60 leading-relaxed font-mono max-w-lg mx-auto">
          All prices are starting points. Final quote depends on scope. Free consultation included.
        </p>
      </div>
    </section>
  );
}
