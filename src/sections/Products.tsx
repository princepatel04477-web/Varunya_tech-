'use client';

import { useEffect, useRef } from 'react';
import {
  Bot,
  Workflow,
  Sparkles,
  MessageSquare,
  Cpu,
} from 'lucide-react';
import anime from '@/lib/anime-utils';

const products = [
  {
    index: '01',
    icon: Bot,
    name: 'AI Content Agent',
    description: 'Advanced autonomous copywriter that generates conversion-optimized copy, blog posts, and multi-channel creative assets in seconds.',
    stat: '10M+ WORDS GENERATED',
    category: 'GENERATIVE AI',
    isFlagship: false,
    isCustom: false,
  },
  {
    index: '02',
    icon: Workflow,
    name: 'AI Automation Engine',
    description: 'Intelligent workflow orchestration that maps your business processes and automates operations with zero human intervention.',
    stat: '500+ WORKFLOWS LIVE',
    category: 'AUTOMATION',
    isFlagship: false,
    isCustom: false,
  },
  {
    index: '03',
    icon: Sparkles,
    name: 'Varunya Core Flagship',
    description: 'Our enterprise intelligence center. Connects all department nodes, aggregates data sources, and runs real-time deep learning analytics.',
    stat: 'ENTERPRISE GRADE',
    category: 'ORCHESTRATION',
    isFlagship: true,
    isCustom: false,
    statsPanel: [
      { value: '500+', label: 'WORKFLOWS LIVE' },
      { value: '3.2x', label: 'AVG TIME SAVED' },
      { value: '14d', label: 'TO DEPLOY' },
    ],
  },
  {
    index: '04',
    icon: MessageSquare,
    name: 'AI Customer Assistant',
    description: 'Conversational support bots with contextual memory and natural language processing that reduce ticket volume by 60%.',
    stat: '99.7% ACCURACY RATE',
    category: 'CONVERSATIONAL',
    isFlagship: false,
    isCustom: false,
  },
  {
    index: '05',
    icon: Cpu,
    name: 'Custom AI Architect',
    description: 'Bespoke machine learning architectures engineered specifically to fit your product\'s unique data inputs and growth strategy.',
    stat: 'TAILORED BUILDS',
    category: 'CUSTOM DEPLOY',
    isFlagship: false,
    isCustom: true, // Uses green breakaway styling
  },
];

interface ProductCellProps {
  product: typeof products[0];
}

function ProductCell({ product }: ProductCellProps) {
  const barRef = useRef<HTMLDivElement>(null);

  const Icon = product.icon;
  const isCustom = product.isCustom;
  const isFlagship = product.isFlagship;

  const accentColor = isCustom ? '#10B981' : '#3B82F6';
  const iconBorderColor = isCustom ? '#10B981' : '#1E3A5F';
  const topIndexColor = '#1E3A5F';
  const dotColor = isCustom ? '#10B981' : '#3B82F6';
  const statColor = isCustom ? '#10B981' : '#3B82F6';
  const barColor = isCustom ? '#10B981' : '#3B82F6';

  const handleMouseEnter = () => {
    if (barRef.current) {
      anime({
        targets: barRef.current,
        width: '100%',
        duration: 350,
        easing: 'easeOutExpo',
      });
    }
  };

  const handleMouseLeave = () => {
    if (barRef.current) {
      anime({
        targets: barRef.current,
        width: '0%',
        duration: 200,
        easing: 'easeInQuad',
      });
    }
  };

  if (isFlagship) {
    return (
      <div
        className="product-cell group relative flex flex-col lg:flex-row items-stretch overflow-hidden bg-[#0D1520] hover:bg-[#111D2E] transition-colors duration-300 md:col-span-2"
        style={{
          opacity: 0,
          transform: 'translateY(32px)',
          gridColumn: '1 / -1',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Content Area */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between relative">
          <div>
            {/* Top Row */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-sm font-bold tracking-wider" style={{ color: topIndexColor }}>
                {product.index}
              </span>
              <div
                className="w-[6px] h-[6px] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                style={{ backgroundColor: dotColor }}
              />
            </div>

            {/* Icon Wrapper */}
            <div
              className="w-11 h-11 flex items-center justify-center rounded-[10px] border mb-5"
              style={{
                borderColor: iconBorderColor,
                backgroundColor: '#0A1628',
              }}
            >
              <Icon className="w-5 h-5" style={{ color: accentColor }} />
            </div>

            {/* Title */}
            <h3 className="text-[17px] font-semibold text-[#E2E8F0] tracking-tight mb-3">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-[13px] text-[#475569] leading-[1.65] max-w-2xl mb-8">
              {product.description}
            </p>
          </div>

          {/* Divider & Footer */}
          <div>
            <div className="h-px w-full bg-[#1E293B] mb-5" />
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs tracking-wider font-semibold" style={{ color: statColor }}>
                {product.stat}
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.08em] rounded-[4px]"
                style={{
                  padding: '3px 8px',
                  backgroundColor: '#0A1628',
                  border: `1px solid ${iconBorderColor}`,
                  color: isCustom ? '#10B981' : '#1E3A5F',
                }}
              >
                {product.category}
              </span>
            </div>
          </div>
        </div>

        {/* Right Mini-Stats Panel */}
        <div className="w-full lg:w-[200px] border-t lg:border-t-0 lg:border-l border-[#1E293B] p-6 lg:p-8 flex flex-col justify-center gap-4 bg-[#090F17] hover:bg-[#0D1520] transition-colors duration-300">
          {product.statsPanel?.map((stat, idx) => (
            <div
              key={idx}
              className="p-[10px] px-[12px] border border-[#1E293B] rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              style={{ backgroundColor: '#0A1628' }}
            >
              <div className="text-[18px] font-semibold text-[#E2E8F0] mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] text-[#475569] font-mono tracking-[0.06em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Hover Bottom Edge Bar */}
        <div
          ref={barRef}
          className="absolute bottom-0 left-0 h-[2px] w-0"
          style={{ backgroundColor: barColor }}
        />
      </div>
    );
  }

  // Standard Column Cell Layout
  return (
    <div
      className="product-cell group relative flex flex-col justify-between p-6 lg:p-8 overflow-hidden bg-[#0D1520] hover:bg-[#111D2E] transition-colors duration-300"
      style={{
        opacity: 0,
        transform: 'translateY(32px)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        {/* Top Row */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-mono text-sm font-bold tracking-wider" style={{ color: topIndexColor }}>
            {product.index}
          </span>
          <div
            className="w-[6px] h-[6px] rounded-full"
            style={{
              backgroundColor: dotColor,
              boxShadow: isCustom ? '0 0 10px rgba(16,185,129,0.5)' : '0 0 10px rgba(59,130,246,0.5)',
            }}
          />
        </div>

        {/* Icon Wrapper */}
        <div
          className="w-11 h-11 flex items-center justify-center rounded-[10px] border mb-5"
          style={{
            borderColor: iconBorderColor,
            backgroundColor: '#0A1628',
          }}
        >
          <Icon className="w-5 h-5" style={{ color: accentColor }} />
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-semibold text-[#E2E8F0] tracking-tight mb-3">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-[#475569] leading-[1.65] mb-8">
          {product.description}
        </p>
      </div>

      {/* Divider & Footer */}
      <div>
        <div className="h-px w-full bg-[#1E293B] mb-5" />
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs tracking-wider font-semibold" style={{ color: statColor }}>
            {product.stat}
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.08em] rounded-[4px]"
            style={{
              padding: '3px 8px',
              backgroundColor: '#0A1628',
              border: `1px solid ${iconBorderColor}`,
              color: isCustom ? '#10B981' : '#1E3A5F',
            }}
          >
            {product.category}
          </span>
        </div>
      </div>

      {/* Hover Bottom Edge Bar */}
      <div
        ref={barRef}
        className="absolute bottom-0 left-0 h-[2px] w-0"
        style={{ backgroundColor: barColor }}
      />
    </div>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to stagger cell reveals on viewport entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.product-cell',
              opacity: [0, 1],
              translateY: [32, 0],
              delay: anime.stagger(80),
              duration: 600,
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
      id="products"
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: '#080D14' }}
    >
      {/* Subtle background noise */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        {/* SECTION HEADER */}
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-[11px] tracking-[0.18em] uppercase text-[#3B82F6] font-mono font-semibold mb-4">
            AI Products Suite
          </span>
          <h2 className="text-[32px] font-semibold text-[#F1F5F9] mb-6">
            Intelligence, built to ship
          </h2>
          <p className="text-[#64748B] text-[14px] leading-relaxed max-w-[420px]">
            Four production-ready AI products. Plug in, customize, and launch under your brand in days — not months.
          </p>
        </div>

        {/* BORDERED GRID CONTAINER */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden border border-[#1E293B]"
          style={{
            display: 'grid',
            gap: '2px',
            backgroundColor: '#1E293B',
          }}
        >
          {products.map((product) => (
            <ProductCell key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
