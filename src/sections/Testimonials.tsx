'use client';

import { motion } from 'framer-motion';
import AnimeCounter from '@/components/AnimeCounter';
import AnimatedHeading from '@/components/AnimatedHeading';
import StaggerParagraph from '@/components/StaggerParagraph';

const testimonials = [
  {
    quote: "Varunya built our landing page in 2 weeks. The 3D scroll effects had our clients calling us to ask who made it.",
    name: "Rohan Mehta",
    role: "Founder",
    company: "Mehta Exports",
    initials: "RM",
  },
  {
    quote: "The AI chatbot they built for our SaaS reduced support tickets by 60% in the first month.",
    name: "Priya Nair",
    role: "CTO",
    company: "LearnStack",
    initials: "PN",
  },
  {
    quote: "Best digital marketing ROI we've seen. Our Instagram leads went from 0 to 40 per week.",
    name: "Arjun Shah",
    role: "Director",
    company: "Shiveshwar Textiles",
    initials: "AS",
  },
];

const metrics = [
  { target: 12, suffix: "+", label: "Projects Delivered" },
  { target: 8, suffix: "+", label: "Happy Clients" },
  { target: 3, suffix: "x", label: "Average ROI" },
];

const processSteps = [
  {
    step: '01',
    phase: 'Synapse',
    title: 'Cognitive Architecture Mapping',
    description: 'We audit your department nodes and map custom LLM pipelines to execute workflows autonomously.',
  },
  {
    step: '02',
    phase: 'Synthesis',
    title: 'Elite Interface Engineering',
    description: 'We develop high-fidelity, tactile, fully animated frontend layers that feel alive and responsive.',
  },
  {
    step: '03',
    phase: 'Integration',
    title: 'Cognitive Node Connection',
    description: 'We wire custom AI agents, automated database tables, and real-time inference points securely.',
  },
  {
    step: '04',
    phase: 'Deployment',
    title: 'Continuous Yield Ship',
    description: 'We push live to modern serverless infrastructure, delivering sub-second paints and maximum conversions.',
  },
];

export default function Testimonials() {
  const doubleTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <>
      <section
        id="testimonials"
        aria-labelledby="testimonials-title"
        className="relative py-[60px] px-5 md:py-32 lg:py-40 md:px-0 overflow-hidden"
        style={{ backgroundColor: '#05070A' }}
      >
      {/* Inline styles for the infinite horizontal marquee */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Accent Orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#3B82F6]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#10B981]/4 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-0 md:px-6 lg:px-[max(16px,4vw)]">
        
        {/* Section Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#3B82F6]/40" />
            <span className="text-xs tracking-[0.1em] md:tracking-[0.3em] uppercase text-[#3B82F6] font-mono">
              Testimonials
            </span>
            <div className="h-px w-12 bg-[#3B82F6]/40" />
          </div>
          <AnimatedHeading
            id="testimonials-title"
            text="Trusted By Innovators"
            className="text-[clamp(22px,5vw,36px)] font-bold mb-6 text-white text-center justify-center"
          />
          <StaggerParagraph
            text="Hear from the visionaries and leaders we partner with to build the future."
            className="text-[#64748B] text-lg max-w-xl text-center"
          />
        </div>
 
        {/* Trust Metrics Grid with count-ups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto mb-32">
          {metrics.map((metric, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={idx}
              className="stat-card rounded-2xl p-5 lg:p-8 text-center bg-[#0C111A] border border-white/[0.04] hover:border-[#3B82F6]/20 transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
            >
              <div className="font-display text-4xl lg:text-5xl font-bold text-[#3B82F6] [text-shadow:0_0_20px_rgba(59,130,246,0.3)] mb-3">
                <AnimeCounter target={metric.target} suffix={metric.suffix} />
              </div>
              <div className="text-[10px] font-mono tracking-[0.1em] md:tracking-[0.18em] text-[#64748B] uppercase">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Infinite Horizontal Auto-Scrolling Marquee */}
      <div className="relative w-full overflow-hidden py-6 border-y border-white/[0.03] bg-white/[0.005] mb-40">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#05070A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#05070A] to-transparent z-10 pointer-events-none" />

        <div className="marquee-container flex gap-6">
          {doubleTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="w-[290px] sm:w-[350px] md:w-[400px] shrink-0 bg-[#0C111A] border border-white/[0.04] rounded-2xl p-5 lg:p-8 flex flex-col justify-between hover:border-[#3B82F6]/25 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-300"
            >
              {/* Star Rating glowing subtly */}
              <div className="flex gap-1 mb-5 text-[#3B82F6] text-sm tracking-wider [text-shadow:0_0_10px_rgba(59,130,246,0.25)]">
                ★★★★★
              </div>
 
              {/* Quote Text */}
              <p className="text-[#E2E8F0] text-[14px] md:text-[15px] leading-[1.65] italic mb-8 flex-grow">
                "{t.quote}"
              </p>
 
              {/* User Metadata */}
              <div className="flex items-center gap-3 border-t border-white/[0.04] pt-5 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6]/20 to-[#3B82F6]/5 flex items-center justify-center text-[#3B82F6] text-xs font-mono font-bold border border-[#3B82F6]/15 shrink-0">
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[14px] font-semibold">
                    {t.name}
                  </span>
                  <span className="text-[11px] text-[#64748B] leading-none mt-1">
                    {t.role}, <span className="text-[#475569]">{t.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
 
      <section
        id="methodology"
        aria-labelledby="methodology-title"
        className="relative py-[60px] px-5 md:py-32 lg:py-40 md:px-0 overflow-hidden"
        style={{ backgroundColor: '#05070A' }}
      >
        {/* Background Accent Orb for Methodology */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#10B981]/4 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-0 md:px-6 lg:px-[max(16px,4vw)]">
        
        {/* Step-by-Step Elite Process Timeline */}
        <div className="mb-40 grid lg:grid-cols-12 gap-3 lg:gap-8 items-start">
          {/* Left sticky column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#10B981]/50" />
              <span className="text-xs tracking-[0.1em] md:tracking-[0.3em] uppercase text-[#10B981] font-mono">
                Methodology
              </span>
            </div>
            <AnimatedHeading
              id="methodology-title"
              text="Our Blueprint For Scale"
              className="text-[clamp(22px,5vw,36px)] font-bold mb-6 text-white"
            />
            <StaggerParagraph
              text="We operate in high-precision cognitive sprints. No bulk developer overhead, no endless cycles — pure execution."
              className="text-[#64748B] text-base leading-relaxed max-w-sm"
            />
          </div>
 
          {/* Right scrolling vertical cards track */}
          <div className="lg:col-span-7 flex flex-col gap-3 md:gap-6 pl-4 border-l border-white/[0.03]">
            {processSteps.map((step, idx) => (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                key={idx}
                className="group relative rounded-2xl p-5 lg:p-8 bg-[#0C111A] border border-white/[0.04] hover:border-[#10B981]/20 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs font-bold text-[#10B981] tracking-[0.1em] md:tracking-[0.2em] uppercase">[ PHASE {step.step} ]</span>
                  <span className="text-[10px] text-[#475569] font-mono tracking-widest uppercase">{step.phase}</span>
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight mb-2 group-hover:text-[#10B981] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-[14px] lg:text-sm text-[#64748B] leading-[1.65]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
