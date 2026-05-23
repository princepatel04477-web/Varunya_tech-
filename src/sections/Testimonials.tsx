import { motion } from 'framer-motion';
import AnimeCounter from '@/components/AnimeCounter';

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

export default function Testimonials() {
  // Duplicate testimonials array to enable seamless infinite horizontal looping
  const doubleTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative py-32 lg:py-40 overflow-hidden bg-void"
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
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#3B82F6]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-amber/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-amber/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-amber font-mono">
              Testimonials
            </span>
            <div className="h-px w-12 bg-amber/50" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-soft-white mb-6">
            Trusted By Innovators
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Hear from the visionaries and leaders we partner with to build the future.
          </p>
        </div>

        {/* Trust Metrics Row (Framer Motion Fade-in on scroll) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
        >
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="stat-card glass-panel rounded-2xl p-6 text-center hover-lift border border-white/5 hover:border-[#3B82F6]/20 transition-all duration-300"
            >
              <div className="font-display text-4xl lg:text-5xl font-bold text-[#3B82F6] [text-shadow:0_0_20px_rgba(59,130,246,0.3)] mb-2">
                <AnimeCounter target={metric.target} suffix={metric.suffix} />
              </div>
              <div className="text-sm font-mono tracking-wider text-muted-foreground uppercase">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Infinite Horizontal Auto-Scrolling Marquee */}
      <div className="relative w-full overflow-hidden py-4 border-y border-white/5 bg-white/[0.01]">
        {/* Soft fading overlays for edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

        <div className="marquee-container flex gap-6">
          {doubleTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="w-[360px] md:w-[400px] shrink-0 bg-[#1E293B] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-[#3B82F6]/30 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] transition-all duration-300"
            >
              {/* Card Header: 5 Electric Blue Stars */}
              <div className="flex gap-1 mb-4 text-[#3B82F6] text-lg tracking-wider [text-shadow:0_0_10px_rgba(59,130,246,0.4)]">
                ★★★★★
              </div>

              {/* Quote Text */}
              <p className="text-soft-white text-sm md:text-base leading-relaxed italic mb-8 flex-grow">
                "{t.quote}"
              </p>

              {/* User Metadata */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
                {/* Avatar Initials Circle */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6]/30 to-[#3B82F6]/10 flex items-center justify-center text-[#4DA3FF] text-sm font-semibold border border-[#3B82F6]/20 shrink-0">
                  {t.initials}
                </div>
                {/* Name & Details */}
                <div className="flex flex-col">
                  <span className="text-soft-white text-sm font-semibold">
                    {t.name}
                  </span>
                  <span className="text-xs text-muted-foreground leading-normal">
                    {t.role}, <span className="text-muted-foreground/80">{t.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
