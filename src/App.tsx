import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Projects from '@/sections/Projects';
import Testimonials from '@/sections/Testimonials';
import TechStack from '@/sections/TechStack';
import Pricing from '@/sections/Pricing';
import Products from '@/sections/Products';
import DigitalMarketing from '@/sections/DigitalMarketing';
import Team from '@/sections/Team';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import { useMagneticAnime } from '@/hooks/useMagneticAnime';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const whatsappRef = useMagneticAnime<HTMLAnchorElement>(0.35);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger after content loads
    ScrollTrigger.refresh();

    // Smooth scroll behavior via Lenis-style approach
    let currentScroll = 0;
    let targetScroll = 0;
    const ease = 0.08;
    let raf: number;

    const smoothScroll = () => {
      targetScroll = window.scrollY;
      currentScroll += (targetScroll - currentScroll) * ease;
      raf = requestAnimationFrame(smoothScroll);
    };
    raf = requestAnimationFrame(smoothScroll);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="custom-cursor">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Animated grain overlay */}
      <div className="animated-grain" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <Services />
        <Products />
        <DigitalMarketing />
        <Projects />
        <Testimonials />
        <TechStack />
        <Pricing />
        <Team />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA Button (Spring Reveal Animation past Hero) */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.a
            ref={whatsappRef}
            href="https://wa.me/919106139666"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 w-[52px] h-[52px] md:w-auto md:h-auto px-0 md:px-5 py-0 md:py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-display text-xs md:text-sm font-bold tracking-wider uppercase shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.55)] hover:scale-105 active:scale-95 transition-all duration-300"
            data-cursor-hover
          >
            <span className="text-lg md:text-base">💬</span>
            <span className="hidden md:inline">Let's Talk</span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
