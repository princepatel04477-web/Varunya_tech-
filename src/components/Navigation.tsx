import { useEffect, useState, useRef } from 'react';

const navLinks = [
  { label: 'Systems', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Projects', href: '#projects' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
        backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.7)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-sm tracking-[0.3em] uppercase text-soft-white hover:text-amber transition-colors duration-300"
          data-cursor-hover
        >
          Varunya Technologies
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="relative text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-soft-white transition-colors duration-300 group"
              data-cursor-hover
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber group-hover:w-full transition-all duration-400" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          onClick={(e) => handleClick(e, '#contact')}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-xs tracking-[0.15em] uppercase text-amber border border-amber/30 rounded-full hover:bg-amber/10 hover:border-amber/60 transition-all duration-300"
          data-cursor-hover
        >
          Book a Call
        </a>
      </div>
    </nav>
  );
}
