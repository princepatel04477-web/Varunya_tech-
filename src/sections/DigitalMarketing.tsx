'use client';

import { useEffect, useRef } from 'react';
import { Search, Target, Instagram, Mail, BarChart2 } from 'lucide-react';
import anime from '@/lib/anime-utils';

const services = [
  {
    number: '01',
    icon: Search,
    name: 'SEO & Content Strategy',
    desc: 'Rank on page 1 for keywords your buyers actually search.',
    strength: 92,
  },
  {
    number: '02',
    icon: Target,
    name: 'Paid Performance (Meta & Google Ads)',
    desc: 'Campaigns that start profitable and scale without waste.',
    strength: 88,
  },
  {
    number: '03',
    icon: Instagram,
    name: 'Social Media Marketing',
    desc: 'Content calendars, reels strategy, and community growth.',
    strength: 85,
  },
  {
    number: '04',
    icon: Mail,
    name: 'Email & Automation Funnels',
    desc: 'Nurture sequences that convert subscribers into buyers.',
    strength: 78,
  },
  {
    number: '05',
    icon: BarChart2,
    name: 'Analytics & Conversion Optimization',
    desc: 'A/B testing, heatmaps, and funnel analysis for more sales.',
    strength: 82,
  },
];

const stats = [
  { value: '312%', label: 'Increase in organic traffic' },
  { value: '4.8x', label: 'Return on ad spend (ROAS)' },
  { value: '67%', label: 'Reduction in cost per lead' },
  { value: '40+', label: 'Leads per week (from zero)' },
];

export default function DigitalMarketing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 1. Stagger the 5 service rows
            anime({
              targets: containerRef.current?.querySelectorAll('.dm-row'),
              opacity: [0, 1],
              translateX: [-24, 0],
              delay: anime.stagger(100),
              duration: 600,
              easing: 'easeOutExpo',
            });

            // 2. Animate progress bars
            anime({
              targets: containerRef.current?.querySelectorAll('.dm-bar'),
              width: (el: HTMLElement) => el.dataset.strength + '%',
              delay: anime.stagger(80, { start: 300 }),
              duration: 800,
              easing: 'easeOutExpo',
            });

            // 3. Stagger the stat blocks in the right panel
            anime({
              targets: containerRef.current?.querySelectorAll('.dm-stat'),
              opacity: [0, 1],
              translateY: [16, 0],
              delay: anime.stagger(80, { start: 200 }),
              duration: 500,
              easing: 'easeOutExpo',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="digital-marketing"
      ref={containerRef}
      aria-labelledby="marketing-title"
      className="relative py-[60px] px-5 md:py-[80px] md:px-0 overflow-hidden"
      style={{ backgroundColor: '#080D14' }}
    >
      {/* Subtle background noise */}
      <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-0 md:px-[max(16px,4vw)]">
        {/* SECTION HEADER */}
        <div className="mb-16 text-center flex flex-col items-center">
          <span className="text-[11px] tracking-[0.1em] lg:tracking-[0.18em] uppercase text-[#3B82F6] font-mono font-semibold mb-4">
            Digital Marketing
          </span>
          <h2 id="marketing-title" className="text-[clamp(22px,5vw,36px)] font-semibold text-[#F1F5F9] mb-4 max-w-[560px] leading-tight">
            We don't run ads. We build growth engines.
          </h2>
          <p className="text-[#64748B] text-[14px] leading-relaxed max-w-[480px]">
            From organic SEO to paid performance campaigns — every rupee tracked, every decision data-backed.
          </p>
        </div>
 
        {/* TWO COLUMN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 items-stretch">
          {/* LEFT COLUMN: Service Rows */}
          <div className="flex-[1.4] flex flex-col">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.name}
                  className="dm-row group relative flex flex-col md:flex-row md:items-center gap-6 py-6 border-b border-[#1E293B] opacity-0 hover:bg-white/[0.01] px-4 -mx-4 rounded-lg transition-colors duration-300"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="font-mono text-sm font-bold text-[#1E3A5F] w-6 shrink-0">
                      {svc.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#E2E8F0] tracking-tight group-hover:text-white transition-colors duration-300">
                        {svc.name}
                      </h4>
                      <p className="text-[14px] text-[#475569] leading-relaxed mt-1">
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-44 shrink-0 flex flex-col gap-2 justify-center">
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-[#475569]">
                      <span>STRENGTH</span>
                      <span className="text-[#3B82F6] font-semibold">{svc.strength}%</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="h-1.5 w-full bg-[#0D1520] rounded-full overflow-hidden border border-white/[0.02]">
                      <div
                        className="dm-bar h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full"
                        style={{ width: '0%' }}
                        data-strength={svc.strength}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
 
          {/* RIGHT COLUMN: Results Stats Panel */}
          <div className="flex-1">
            <div className="bg-[#0D1520] border border-[#1E293B] rounded-xl p-5 lg:p-7 flex flex-col justify-between h-full shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <div>
                <h3 className="text-[14px] font-semibold text-[#E2E8F0] tracking-wider uppercase font-mono">
                  Client Results
                </h3>
                <p className="text-[12px] text-[#475569] font-mono mt-1 mb-8">
                  Avg. across last 6 campaigns
                </p>
 
                <div className="space-y-6">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="dm-stat opacity-0 flex flex-col">
                      <span className="text-[28px] font-bold text-[#3B82F6] font-mono tracking-tight leading-none">
                        {stat.value}
                      </span>
                      <span className="text-[12px] text-[#475569] mt-2 font-medium tracking-wide">
                        {stat.label}
                      </span>
                      {i < stats.length - 1 && <div className="h-px w-full bg-[#1E293B] mt-6" />}
                    </div>
                  ))}
                </div>
              </div>
 
              {/* CTA Card */}
              <div className="mt-8 bg-[#0A1628] border border-[#1E3A5F] rounded-lg p-5 flex flex-col gap-4">
                <div>
                  <h4 className="text-[14px] font-medium text-[#E2E8F0]">Ready to grow?</h4>
                  <p className="text-[12px] text-[#475569] mt-1 leading-relaxed">
                    Free 30-min marketing audit — no commitment.
                  </p>
                </div>
                <a
                  href="https://calendly.com/placeholder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 min-h-[44px] bg-[#3B82F6] hover:bg-[#2563EB] active:scale-95 text-white flex items-center justify-center text-xs font-semibold rounded-md transition-all duration-300 font-mono tracking-wider uppercase block"
                  data-cursor-hover
                >
                  Book Free Audit →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
