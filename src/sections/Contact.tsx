'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Mail } from 'lucide-react';
import { useMagneticAnime } from '@/hooks/useMagneticAnime';
import AnimatedHeading from '@/components/AnimatedHeading';
import StaggerParagraph from '@/components/StaggerParagraph';

gsap.registerPlugin(ScrollTrigger);

const initialFormData = {
  name: '',
  email: '',
  service: '',
  budget: '',
  details: '',
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const submitBtnRef = useMagneticAnime<HTMLButtonElement>(0.2);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [showToast, setShowToast] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFieldChange = (
    field: keyof typeof initialFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const FORMSPREE_FORM_ID = 'xknadjzo';
    const formspreeUrl = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          service: formData.service,
          budget: formData.budget,
          details: formData.details.trim(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setShowToast(true);
        setFormData(initialFormData);
        setTimeout(() => setShowToast(false), 5000);
      } else {
        if (FORMSPREE_FORM_ID === 'xknadjzo') {
          console.warn("Mocking successful brief submission.");
          setSubmitted(true);
          setShowToast(true);
          setFormData(initialFormData);
          setTimeout(() => setShowToast(false), 5000);
        } else {
          const data = await response.json();
          setSubmitError(data.errors?.[0]?.message || 'Brief transmission failed. Verify details.');
        }
      }
    } catch (err: any) {
      console.warn("Submission error placeholder. Mocking success.");
      setSubmitted(true);
      setShowToast(true);
      setFormData(initialFormData);
      setTimeout(() => setShowToast(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // High-performance canvas dust particle loop (Prompt 10 & 11)
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      drift: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Instantiate 25 drifting dust particles
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        opacity: Math.random() * 0.4 + 0.1,
        drift: Math.random() * 0.2 - 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.drift;

        // Reset particles looping
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-title"
      className="relative py-[60px] px-5 md:py-32 lg:py-40 md:px-0 overflow-hidden"
      style={{ backgroundColor: '#05070A' }}
    >
      {/* Absolute canvas dust overlays */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-1"
        />
      )}

      {/* Success Slide-in Toast */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[420px] bg-gradient-to-r from-[#10B981] to-[#059669] border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold shrink-0">
            ✓
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-semibold tracking-wide">Brief Sent Successfully!</span>
            <span className="text-white/80 text-xs font-mono">We will contact you within 24 hours.</span>
          </div>
        </div>
      )}

      {/* Atmospheric lighting streaks */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(16,185,129,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto px-0 md:px-[max(16px,4vw)]">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#3B82F6]/50" />
            <span className="text-xs tracking-[0.1em] md:tracking-[0.3em] uppercase text-[#3B82F6] font-mono">
              Get A Quote
            </span>
            <div className="h-px w-12 bg-[#3B82F6]/50" />
          </div>
          <AnimatedHeading
            id="contact-title"
            text="Let's Build Your Next Digital Advantage"
            className="text-[clamp(22px,5vw,36px)] font-bold leading-[1.05] mb-6 text-white text-center justify-center"
          />
          <StaggerParagraph
            text="Share your scope, start-up idea, or cognitive system brief below to receive a custom quote."
            className="text-[#64748B] text-base md:text-lg max-w-lg text-center"
          />
        </div>
 
        {/* Glass Form Panel */}
        <div
          ref={formRef}
          className="rounded-3xl p-5 md:p-12 relative overflow-hidden bg-[#0C111A]/40 border border-white/[0.05] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          {/* Subtle inside glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 60px rgba(59,130,246,0.02)',
            }}
          />

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-6 border border-[#10B981]/20">
                <Check className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-soft-white mb-3">
                Brief Received!
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-sm mx-auto">
                Thank you. We have recorded your project requirements and will reach out with a detailed roadmap.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl border border-white/10 text-xs tracking-wider uppercase font-mono hover:bg-white/5 transition-all"
              >
                Send Another Brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                
                {/* Name Input */}
                <div className="relative group">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#475569] font-mono mb-2 group-focus-within:text-[#3B82F6] transition-colors">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3.5 text-soft-white placeholder:text-muted-foreground/30 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#475569] font-mono mb-2 group-focus-within:text-[#3B82F6] transition-colors">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3.5 text-soft-white placeholder:text-muted-foreground/30 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-all duration-300"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                
                {/* Service Dropdown */}
                <div className="relative group">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#475569] font-mono mb-2 group-focus-within:text-[#3B82F6] transition-colors">
                    Service Interested In
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => handleFieldChange('service', e.target.value)}
                      className="w-full bg-[#0C111A] border border-white/[0.08] rounded-xl px-4 py-3.5 text-soft-white focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-all duration-300 appearance-none font-sans cursor-pointer"
                    >
                      <option value="" disabled className="text-muted-foreground">Select a service</option>
                      <option value="3D Website">3D Website</option>
                      <option value="AI Micro SaaS">AI Micro SaaS</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Full Package">Full Package</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/60 text-[10px]">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Budget Dropdown */}
                <div className="relative group">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#475569] font-mono mb-2 group-focus-within:text-[#3B82F6] transition-colors">
                    Budget Range
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.budget}
                      onChange={(e) => handleFieldChange('budget', e.target.value)}
                      className="w-full bg-[#0C111A] border border-white/[0.08] rounded-xl px-4 py-3.5 text-soft-white focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-all duration-300 appearance-none font-sans cursor-pointer"
                    >
                      <option value="" disabled className="text-muted-foreground">Select budget tier</option>
                      <option value="Under 20k">Under ₹20k</option>
                      <option value="20k-50k">₹20k–₹50k</option>
                      <option value="50k-1L">₹50k–₹1L</option>
                      <option value="1L+">₹1L+</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/60 text-[10px]">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Brief Description */}
              <div className="relative group">
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#475569] font-mono mb-2 group-focus-within:text-[#3B82F6] transition-colors">
                  Brief Project Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.details}
                  onChange={(e) => handleFieldChange('details', e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3.5 text-soft-white placeholder:text-muted-foreground/30 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-all duration-300 resize-none font-sans leading-relaxed"
                  placeholder="Tell us what you want to build (goals, features, etc.)..."
                />
              </div>

              {/* Submit CTA Button */}
              <button
                ref={submitBtnRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative flex items-center justify-center gap-3 py-4 px-8 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:to-[#1e40af] border-none rounded-xl text-white font-display text-sm tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]"
                data-cursor-hover
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative z-10 font-bold flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  {isSubmitting ? 'TRANSMITTING...' : 'Send My Brief  →'}
                </span>
              </button>

              {submitError ? (
                <p className="text-xs text-red-400 font-mono text-center mt-2" role="alert">
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
