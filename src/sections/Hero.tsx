'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Sparkles, Cpu } from 'lucide-react';
import ParticleField from '@/components/ParticleField';
import anime from '@/lib/anime-utils';
import { useMagneticAnime } from '@/hooks/useMagneticAnime';

const metrics = [
  'Cognitive Workflows',
  'Multi-Modal AI Platforms',
  'Three.js / 3D Systems',
  'Enterprise Orchestration',
  'Elite UI Engineering',
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryCtaRef = useMagneticAnime<HTMLAnchorElement>(0.3);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse coordinates tracked as MotionValues for high-performance spring-based parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for lag-free, organic movement
  const springConfig = { damping: 40, stiffness: 100, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform coordinates into translations & rotations for layered depth (Parallax)
  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);
  
  const textTranslateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const textTranslateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const cardsRotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const cardsRotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track cursor movement only on desktop viewports
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  // GSAP Loop: Cinematic Ambient Light Streaks
  useEffect(() => {
    const ctx = gsap.context(() => {
      const streaks = gsap.utils.toArray('.ambient-light-streak');
      streaks.forEach((streak: any, index: number) => {
        const duration = 16 + index * 5;
        const delay = index * 4;

        // Horizontal sliding animation
        gsap.fromTo(
          streak,
          {
            x: '-120%',
            rotate: -20 + index * 10,
          },
          {
            x: '120%',
            duration: duration,
            repeat: -1,
            delay: delay,
            ease: 'sine.inOut',
          }
        );

        // Synchronized opacity fade-in/fade-out animation (100% type-safe)
        gsap.fromTo(
          streak,
          { opacity: 0 },
          {
            opacity: 0.25,
            duration: duration / 2,
            yoyo: true,
            repeat: -1,
            delay: delay,
            ease: 'sine.inOut',
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Anime.js timeline orchestrating staggered word lifts and card transitions
  useEffect(() => {
    const tl = anime.timeline({ easing: 'easeOutExpo', duration: 850 });

    tl
      .add({
        targets: '.hero-eyebrow',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
      })
      .add({
        targets: '.hero-word',
        opacity: [0, 1],
        translateY: ['100%', '0%'],
        rotate: [6, 0],
        delay: anime.stagger(60),
        duration: 900,
      }, '-=400')
      .add({
        targets: '.hero-subtext',
        opacity: [0, 1],
        translateY: [25, 0],
        duration: 700,
      }, '-=600')
      .add({
        targets: '.hero-cta-primary, .hero-cta-secondary',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.96, 1],
        delay: anime.stagger(100),
        duration: 600,
      }, '-=500')
      .add({
        targets: '.hero-metric',
        opacity: [0, 1],
        translateY: [15, 0],
        delay: anime.stagger(50),
        duration: 500,
      }, '-=400');

    return () => {
      tl.revert();
    };
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.22em] pb-[0.06em]">
        <span
          className="hero-word inline-block origin-bottom-left opacity-0 translate-y-full rotate-[6deg]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </span>
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#05070A' }}
    >
      {/* Background stars / dust particles field */}
      <ParticleField />

      {/* Subtle overlay cinematic grain */}
      <div className="absolute inset-0 z-2 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Dynamic floating HSL blurred gradients driven by mouse springs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <motion.div
          style={{
            x: bgTranslateX,
            y: bgTranslateY,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[-10%] left-[-15%] w-[65%] h-[65%] rounded-full bg-gradient-to-br from-[#3B82F6] to-[#00E5FF] blur-[150px]"
        />
        <motion.div
          style={{
            x: bgTranslateX,
            y: bgTranslateY,
          }}
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.05, 0.09, 0.05],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#10B981] to-[#3B82F6] blur-[150px]"
        />
      </div>

      {/* GSAP horizontal rotating cinematic light streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div className="ambient-light-streak absolute top-[25%] left-[-50%] w-[200%] h-[1.5px] bg-gradient-to-r from-transparent via-[#3B82F6]/15 to-transparent" />
        <div className="ambient-light-streak absolute top-[55%] left-[-50%] w-[200%] h-[1.5px] bg-gradient-to-r from-transparent via-[#10B981]/10 to-transparent" />
        <div className="ambient-light-streak absolute top-[85%] left-[-50%] w-[200%] h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/5 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-[max(16px,4vw)] w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-screen py-32 lg:py-40">
          
          {/* Left Column: Elite Typography & Branding */}
          <motion.div
            style={{
              x: isMobile ? 0 : textTranslateX,
              y: isMobile ? 0 : textTranslateY,
            }}
            className="lg:col-span-7 flex flex-col justify-center text-left hero-left-content"
          >
            {/* Minimalist Monospace Eyebrow Tagline */}
            <div className="hero-eyebrow mb-6 flex items-center gap-2 text-[10px] md:text-xs font-mono font-bold tracking-[0.1em] md:tracking-[0.3em] uppercase text-[#3B82F6] opacity-0 translate-y-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
              Cognitive Cores · Elite Interfaces
            </div>

            {/* Headline with luxurious 3D word-by-word reveal */}
            <h1 className="hero-headline font-display text-[clamp(28px,6vw,56px)] leading-[1.05] md:leading-[0.98] tracking-[-0.03em] text-white flex flex-col gap-2 mb-8 overflow-hidden py-1">
              <span className="block overflow-hidden">
                {splitWords("We Architect")}
              </span>
              <span className="block overflow-hidden font-bold">
                {splitWords("Intelligence.")}
              </span>
            </h1>

            {/* Cinematic Subtext Paragraph */}
            <p className="hero-subtext text-[#64748B] text-[14px] md:text-base lg:text-[17px] leading-[1.65] max-w-xl mb-4 opacity-0 translate-y-5">
              Varunya Technologies engineers world-class autonomous systems, multi-modal interfaces, and high-performance digital architectures. From concept to production, we deliver elite products designed to endure.
            </p>

            {/* Services Tag List */}
            <div className="hero-subtext flex flex-wrap gap-2 mt-2 mb-10 opacity-0 translate-y-5">
              {['3D Websites', 'AI Micro SaaS', 'Digital Marketing'].map((tag) => (
                <span
                  key={tag}
                  className="transition-all duration-300 select-none hover:scale-105"
                  style={{
                    background: '#0A1628',
                    border: '1px solid #1E3A5F',
                    color: '#3B82F6',
                    fontSize: '12px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Highly Polished Magnetic CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
              <a
                ref={primaryCtaRef}
                href="#contact"
                className="hero-cta-primary inline-flex items-center justify-center gap-3 min-h-[44px] py-3 px-7 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white hover:to-[#1e40af] transition-all duration-500 rounded-xl font-display text-xs md:text-sm font-semibold tracking-wider uppercase active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] w-full sm:w-auto opacity-0 translate-y-5"
                data-cursor-hover
              >
                Initiate Deployment  →
              </a>
              <a
                href="#services"
                className="hero-cta-secondary inline-flex items-center justify-center gap-3 min-h-[44px] py-3 px-7 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all duration-300 rounded-xl font-display text-xs md:text-sm tracking-wider uppercase active:scale-[0.98] w-full sm:w-auto opacity-0 translate-y-5"
                data-cursor-hover
              >
                Explore Capabilities
              </a>
            </div>

            {/* Micro-Pill Capability Metrics */}
            <div className="flex flex-wrap gap-3">
              {metrics.map((metric) => (
                <div
                  key={metric}
                  className="hero-metric px-4 py-2 rounded-full border border-white/[0.04] bg-[#0A1628]/35 text-[10px] tracking-wider uppercase text-[#475569] hover:text-[#3B82F6] hover:border-[#3B82F6]/25 transition-all duration-500 opacity-0 translate-y-[15px]"
                  data-cursor-hover
                >
                  ✦ {metric}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Layered 3D Parallax Glass Cards */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative perspective-1000">
            <motion.div
              style={{
                rotateX: cardsRotateX,
                rotateY: cardsRotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-[420px] h-[480px]"
            >
              {/* Floating Service Badge 1 (Top-Left) */}
              <motion.div
                style={{ transform: 'translateZ(65px)' }}
                className="absolute -top-6 -left-12 px-4 py-2 rounded-full border border-white/[0.05] bg-[#05070A]/85 text-[#3B82F6] font-mono text-[9px] uppercase tracking-[0.2em] shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                ✦ Autonomous Cores
              </motion.div>

              {/* Floating Service Badge 2 (Bottom-Right) */}
              <motion.div
                style={{ transform: 'translateZ(85px)' }}
                className="absolute -bottom-6 -right-12 px-4 py-2 rounded-full border border-white/[0.05] bg-[#05070A]/85 text-[#10B981] font-mono text-[9px] uppercase tracking-[0.2em] shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                ✦ Elite Design Architecture
              </motion.div>

              {/* Card 1 - Core Neural Glass Card */}
              <motion.div
                style={{ transform: 'translateZ(20px) rotateY(-5deg) rotateX(3deg)' }}
                className="absolute inset-0 rounded-2xl p-6 border border-white/[0.07] bg-[#0A111E]/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0A1628] border border-[#1E3A5F] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white tracking-wide">Cognitive Mesh v4</div>
                      <div className="text-[8px] text-[#475569] font-mono">SYS STATUS: ACTIVE</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-ping" />
                </div>

                {/* Neural Network SVG Orbits */}
                <div className="flex-1 my-6 rounded-xl border border-white/[0.03] bg-black/25 flex items-center justify-center overflow-hidden relative">
                  <svg className="w-44 h-44 opacity-80" viewBox="0 0 100 100">
                    {/* Concentric rings */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" strokeDasharray="3 6" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="1" />
                    <circle cx="50" cy="50" r="16" fill="none" stroke="rgba(59, 130, 246, 0.16)" strokeWidth="1" strokeDasharray="6 3" />
                    {/* Core */}
                    <circle cx="50" cy="50" r="4" fill="#3B82F6" className="animate-pulse" />
                    {/* Orbits */}
                    <circle cx="22" cy="50" r="3" fill="#10B981" />
                    <line x1="50" y1="50" x2="22" y2="50" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1" />
                    <circle cx="70" cy="70" r="2.5" fill="#3B82F6" />
                    <line x1="50" y1="50" x2="70" y2="70" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />
                    <circle cx="60" cy="30" r="2" fill="#E2E8F0" />
                    <line x1="50" y1="50" x2="60" y2="30" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
                  </svg>
                </div>

                {/* Live Terminal Console lines */}
                <div className="bg-black/45 p-3 rounded-lg border border-white/[0.04] font-mono text-[9px] text-[#475569] flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#3B82F6]">▸ INITIALIZING INTEGRITY</span>
                    <span className="text-white/40">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#10B981]">▸ QUANTUM_TUNNEL.SECURE</span>
                    <span className="text-[#10B981]">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>▸ MODEL_LATENCY</span>
                    <span>18ms</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Foreground Stat Card */}
              <motion.div
                style={{ transform: 'translateZ(50px) rotateY(6deg) rotateX(-4deg)' }}
                className="absolute bottom-6 -right-6 w-[220px] h-[150px] rounded-xl p-5 border border-white/[0.08] bg-[#05070A]/65 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#475569] font-mono uppercase tracking-wider">Operational Yield</span>
                  <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <div className="my-2">
                  <div className="text-2xl font-bold text-white tracking-tight">3.2x</div>
                  <div className="text-[9px] text-[#10B981] font-mono mt-0.5">✦ AVERAGE ROI INCREASE</div>
                </div>
                <div className="w-full bg-white/[0.04] h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '82%' }}
                    transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Premium Minimalist Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#475569] font-mono">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#3B82F6]/50 to-transparent relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#3B82F6] to-[#00E5FF]"
            style={{
              animation: 'scroll-line 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
            }}
          />
        </div>
      </div>

      {/* Style element for custom css scroll animations */}
      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>

      {/* Gradient overlay bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #05070A, transparent)',
        }}
      />
    </section>
  );
}
