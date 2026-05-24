'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from '@/lib/anime-utils';
import { useMagneticAnime } from '@/hooks/useMagneticAnime';

const navLinks = [
  { label: 'Systems', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Projects', href: '#projects' },
  { label: 'Team', href: '#team' },
  { label: 'Marketing', href: '#digital-marketing' },
  { label: 'Contact', href: '#contact' },
];

const usePathname = () => {
  const [pathname, setPathname] = useState('/');
  useEffect(() => {
    const handleHashChange = () => {
      setPathname(window.location.hash || '/');
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  return pathname;
};

interface NavLinkProps {
  label: string;
  href: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  handleMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  handleMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

function NavLink({ label, href, isActive, onClick, handleMouseEnter, handleMouseLeave }: NavLinkProps) {
  const ref = useMagneticAnime<HTMLAnchorElement>(0.2);
  return (
    <a
      ref={ref}
      href={href}
      onClick={(e) => onClick(e, href)}
      onMouseEnter={(e) => handleMouseEnter(e, href)}
      onMouseLeave={(e) => handleMouseLeave(e, href)}
      className="relative text-[11px] tracking-[0.1em] md:tracking-[0.25em] uppercase text-muted-foreground hover:text-white transition-colors duration-300 font-mono py-[15px] md:py-2 flex items-center justify-center"
      data-cursor-hover
    >
      {label}
      <span
        className="nav-underline"
        style={{
          display: 'block',
          height: '1px',
          background: '#3B82F6',
          width: isActive ? '100%' : '0%',
          borderRadius: '1px',
          marginTop: '4px',
        }}
      />
    </a>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const bookCallRef = useMagneticAnime<HTMLAnchorElement>(0.25);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) return;
    const underline = e.currentTarget.querySelector('.nav-underline');
    if (underline) {
      anime({
        targets: underline,
        width: ['0%', '100%'],
        duration: 250,
        easing: 'easeOutQuad',
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) return;
    const underline = e.currentTarget.querySelector('.nav-underline');
    if (underline) {
      anime({
        targets: underline,
        width: ['100%', '0%'],
        duration: 200,
        easing: 'easeInQuad',
      });
    }
  };

  // Hamburger line open/close animation via Anime.js
  useEffect(() => {
    if (isOpen) {
      anime({
        targets: '.nav-line-1',
        translateY: 6,
        rotate: 45,
        duration: 250,
        easing: 'easeOutQuart',
      });
      anime({
        targets: '.nav-line-2',
        opacity: 0,
        scaleX: 0,
        duration: 250,
        easing: 'easeOutQuart',
      });
      anime({
        targets: '.nav-line-3',
        translateY: -6,
        rotate: -45,
        duration: 250,
        easing: 'easeOutQuart',
      });
    } else {
      anime({
        targets: '.nav-line-1',
        translateY: 0,
        rotate: 0,
        duration: 250,
        easing: 'easeOutQuart',
      });
      anime({
        targets: '.nav-line-2',
        opacity: 1,
        scaleX: 1,
        duration: 250,
        easing: 'easeOutQuart',
      });
      anime({
        targets: '.nav-line-3',
        translateY: 0,
        rotate: 0,
        duration: 250,
        easing: 'easeOutQuart',
      });
    }
  }, [isOpen]);

  return (
    <header>
      <motion.nav
        ref={navRef}
        animate={{
          top: scrolled ? 16 : 24,
          height: scrolled ? 54 : 64,
          backgroundColor: scrolled ? 'rgba(5, 7, 10, 0.72)' : 'rgba(5, 7, 10, 0.28)',
          borderColor: scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 -translate-x-1/2 w-[92%] max-w-[1200px] z-40 rounded-full border flex items-center justify-between px-6 md:px-[max(16px,4vw)] backdrop-blur-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Logo - Hide Technologies below 380px width */}
        <a
          href="#"
          onClick={(e) => handleClick(e, '#hero')}
          className="font-display text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white hover:text-[#3B82F6] transition-colors duration-300 font-bold"
          data-cursor-hover
        >
          <span className="font-bold">Varunya</span>
          <span className="hidden min-[380px]:inline text-white/50 font-normal"> Technologies</span>
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <NavLink
                key={link.label}
                label={link.label}
                href={link.href}
                isActive={isActive}
                onClick={handleClick}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            );
          })}
        </nav>

        {/* Desktop Magnetic CTA Button */}
        <a
          ref={bookCallRef}
          href="#contact"
          onClick={(e) => handleClick(e, '#contact')}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[10px] tracking-[0.18em] uppercase text-white border border-[#3B82F6]/30 rounded-full bg-[#3B82F6]/5 hover:bg-[#3B82F6]/15 hover:border-[#3B82F6]/75 transition-all duration-300 font-mono"
          data-cursor-hover
        >
          Book a Call
        </a>

        {/* Mobile Hamburger Toggle (Minimum 44x44px Touch Target) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 border border-white/5 rounded-full bg-white/5 focus:outline-none transition-all duration-300 z-50 relative"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <div className="relative w-5 h-3.5 flex flex-col justify-between">
            <span className="nav-line-1 w-5 h-0.5 bg-white rounded-full origin-center" />
            <span className="nav-line-2 w-5 h-0.5 bg-white rounded-full origin-center" />
            <span className="nav-line-3 w-5 h-0.5 bg-white rounded-full origin-center" />
          </div>
        </button>
      </motion.nav>

      {/* Full-width Mobile Menu Overlay Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} // easeOutExpo
            style={{
              top: scrolled ? '70px' : '88px',
              height: scrolled ? 'calc(100vh - 70px)' : 'calc(100vh - 88px)',
            }}
            className="fixed left-0 right-0 w-full z-30 bg-[#080D14]/98 backdrop-blur-[12px] md:hidden flex flex-col justify-between pb-8 overflow-y-auto border-b border-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Links List stacked vertically */}
            <div className="flex flex-col w-full px-6 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const underline = e.currentTarget.querySelector('.nav-underline-mobile');
                      if (underline) {
                        anime({
                          targets: underline,
                          width: ['0%', '100%'],
                          duration: 250,
                          easing: 'easeOutQuad',
                          complete: () => {
                            setTimeout(() => {
                              const target = document.querySelector(link.href);
                              if (target) {
                                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                window.history.pushState(null, '', link.href);
                                window.dispatchEvent(new HashChangeEvent('hashchange'));
                              }
                              setIsOpen(false);
                            }, 120);
                          }
                        });
                      } else {
                        // Fallback
                        const target = document.querySelector(link.href);
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          window.history.pushState(null, '', link.href);
                          window.dispatchEvent(new HashChangeEvent('hashchange'));
                        }
                        setIsOpen(false);
                      }
                    }}
                    className="w-full h-[52px] flex flex-col justify-center text-[20px] font-medium font-mono text-muted-foreground hover:text-white border-b border-[#1E293B] relative group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{link.label}</span>
                      <span className="text-[10px] text-muted-foreground/30 font-mono">▸</span>
                    </div>
                    {/* Underline draw element */}
                    <span
                      className="nav-underline-mobile absolute bottom-0 left-0 block h-[1px] bg-[#3B82F6] rounded-full"
                      style={{ width: isActive ? '100%' : '0%' }}
                    />
                  </a>
                );
              })}
            </div>

            {/* CTA in Mobile Overlay */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#contact');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  window.history.pushState(null, '', '#contact');
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
                setIsOpen(false);
              }}
              className="mx-6 min-h-[48px] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-lg flex items-center justify-center font-display uppercase tracking-widest transition-colors duration-300"
            >
              Book a Free Call →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
