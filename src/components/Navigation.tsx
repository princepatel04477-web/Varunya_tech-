import { useEffect, useState, useRef } from 'react';
import anime from '@/lib/anime-utils';

const navLinks = [
  { label: 'Systems', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Projects', href: '#projects' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

// Safe usePathname hook to support both Vite single-page hash navigation and Next.js routing
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

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // BEHAVIOR A — Navbar background on scroll driven by Anime.js
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector('.site-nav') as HTMLElement;
      if (!nav) return;
      if (window.scrollY > 60) {
        anime({
          targets: nav,
          backgroundColor: 'rgba(15,23,42,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottomColor: 'rgba(59,130,246,0.2)',
          duration: 300,
          easing: 'easeOutQuad',
        });
      } else {
        anime({
          targets: nav,
          backgroundColor: 'rgba(15,23,42,0)',
          backdropFilter: 'blur(0px)',
          borderBottomColor: 'rgba(255,255,255,0)',
          duration: 300,
          easing: 'easeOutQuad',
        });
      }
    };
    
    // Trigger initial check
    onScroll();
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update hash history to trigger active path change
      window.history.pushState(null, '', href);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  };

  // BEHAVIOR B — Active link underline draw on hover
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

  return (
    <>
      <nav
        ref={navRef}
        className="site-nav fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b border-transparent"
        style={{
          backgroundColor: 'rgba(15,23,42,0)',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xs sm:text-sm tracking-[0.25em] uppercase text-soft-white hover:text-amber transition-colors duration-300"
            data-cursor-hover
          >
            Varunya Technologies
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  onMouseEnter={(e) => handleMouseEnter(e, link.href)}
                  onMouseLeave={(e) => handleMouseLeave(e, link.href)}
                  className="relative text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-soft-white transition-colors duration-300"
                  data-cursor-hover
                >
                  {link.label}
                  <span
                    className="nav-underline"
                    style={{
                      display: 'block',
                      height: '1.5px',
                      background: '#3B82F6',
                      width: isActive ? '100%' : '0%',
                      borderRadius: '1px',
                      marginTop: '4px',
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-xs tracking-[0.15em] uppercase text-amber border border-amber/30 rounded-full hover:bg-amber/10 hover:border-amber/60 transition-all duration-300"
            data-cursor-hover
          >
            Book a Call
          </a>

          {/* Mobile Hamburger Toggle (Minimum 44x44px Touch Target) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 border border-white/10 rounded-full bg-white/5 focus:outline-none transition-all duration-300 hover:border-white/20"
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={`w-5 h-0.5 bg-soft-white rounded-full transition-transform duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-soft-white rounded-full transition-opacity duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-soft-white rounded-full transition-transform duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Over Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
        />
      )}

      {/* Mobile Menu Slide-Over Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-[300px] z-50 bg-[#050505]/95 border-l border-white/10 backdrop-blur-3xl p-6 flex flex-col justify-between transition-transform duration-500 ease-out md:hidden ${
          isOpen ? 'translate-x-0 shadow-[-20px_0_40px_rgba(0,0,0,0.8)]' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Drawer Header */}
          <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5">
            <span className="text-[10px] tracking-[0.25em] font-mono text-cyan uppercase font-semibold">Navigation</span>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-soft-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Nav Links (Minimum 44px tap-target height via padding) */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleClick(e, link.href);
                  setIsOpen(false);
                }}
                className="py-3 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-soft-white border-b border-white/5 transition-colors duration-300 flex items-center min-h-[44px]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile CTA Drawer Footer */}
        <a
          href="#contact"
          onClick={(e) => {
            handleClick(e, '#contact');
            setIsOpen(false);
          }}
          className="w-full text-center py-4 text-xs tracking-[0.2em] uppercase text-amber border border-amber/30 rounded-xl hover:bg-amber/10 transition-all duration-300 min-h-[48px] flex items-center justify-center font-display font-medium"
        >
          Book a Call
        </a>
      </div>
    </>
  );
}
