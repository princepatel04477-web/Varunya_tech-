export default function Footer() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Work', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative py-16 lg:py-20 border-t border-white/5 bg-void">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Logo Name & Tagline */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <a
              href="#"
              onClick={(e) => handleNav(e, '#')}
              className="font-display text-base tracking-[0.25em] uppercase text-soft-white hover:text-amber transition-colors duration-300 mb-2 font-bold"
              data-cursor-hover
            >
              Varunya Technologies
            </a>
            <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-mono">
              Intelligent Digital Futures
            </span>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-soft-white transition-colors duration-300 font-mono"
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-[#3B82F6] hover:border-[#3B82F6]/30 transition-all duration-300"
                data-cursor-hover
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground font-mono">
            &copy; 2025 Varunya Technologies. All rights reserved.
          </p>
          <p className="text-[10px] text-muted-foreground/60 font-mono">
            Made with ☕ in Surat, India
          </p>
        </div>
      </div>
    </footer>
  );
}
