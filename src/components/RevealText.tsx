'use client';

import { motion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function RevealText({ text, className = '', delay = 0 }: RevealTextProps) {
  const chars = Array.from(text);

  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const charVars = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  return (
    <motion.span
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      className={`inline-block ${className}`}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          variants={charVars}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
