import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Projects from '@/sections/Projects';
import Products from '@/sections/Products';
import Team from '@/sections/Team';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
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
        <Projects />
        <Products />
        <Team />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
