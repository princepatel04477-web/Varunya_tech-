import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const initialFormData = {
  name: '',
  email: '',
  company: '',
  details: '',
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (
    field: keyof typeof initialFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!supabase) {
      setSubmitError(
        'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const { error } = await supabase.from('contact_queries').insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim() || null,
      details: formData.details.trim(),
    });

    if (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
      return;
    }

    setSubmitted(true);
    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(255,170,51,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(0,229,255,0.03) 0%, transparent 50%)',
        }}
      />

      {/* Floating fog */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none opacity-30"
        style={{
          background:
            'linear-gradient(to top, rgba(5,5,5,0.8), transparent)',
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-cyan/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-cyan font-mono">
              Start Building
            </span>
            <div className="h-px w-12 bg-cyan/50" />
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-soft-white mb-4">
            LET&apos;S BUILD THE
            <br />
            <span className="text-glow-cyan">FUTURE TOGETHER</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell us about your idea, startup, SaaS product, or AI system.
          </p>
        </div>

        {/* Glass Form */}
        <div
          ref={formRef}
          className="glass-panel rounded-3xl p-8 lg:p-12 relative overflow-hidden"
        >
          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              boxShadow:
                'inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 60px rgba(0,229,255,0.05)',
            }}
          />

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-soft-white mb-3">
                Project Received
              </h3>
              <p className="text-muted-foreground">
                We&apos;ll be in touch within 24 hours to discuss your vision.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">
                    Name
                  </label>
                   <input
                     type="text"
                     required
                     value={formData.name}
                     onChange={(e) => handleFieldChange('name', e.target.value)}
                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-soft-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all duration-300"
                     placeholder="Your name"
                   />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">
                    Email
                  </label>
                   <input
                     type="email"
                     required
                     value={formData.email}
                     onChange={(e) => handleFieldChange('email', e.target.value)}
                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-soft-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all duration-300"
                     placeholder="you@company.com"
                   />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleFieldChange('company', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-soft-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all duration-300"
                  placeholder="Company name (optional)"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">
                  Project Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.details}
                  onChange={(e) => handleFieldChange('details', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-soft-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all duration-300 resize-none"
                  placeholder="Describe your project, idea, or AI system..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative flex items-center justify-center gap-3 py-4 px-8 bg-gradient-to-r from-amber/20 to-amber/10 border border-amber/30 rounded-xl text-amber font-display text-sm tracking-[0.2em] uppercase hover:from-amber/30 hover:to-amber/20 hover:border-amber/50 transition-all duration-500 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                data-cursor-hover
              >
                {/* Light streak on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-amber/10 to-transparent" />
                <span className="relative z-10">
                  {isSubmitting ? 'SENDING...' : 'LAUNCH PROJECT'}
                </span>
                <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {submitError ? (
                <p className="text-sm text-red-400" role="alert">
                  {submitError}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
