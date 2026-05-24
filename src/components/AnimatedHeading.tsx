'use client';

import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  id?: string;
}

export default function AnimatedHeading({ text, className = '', delay = 0, id }: AnimatedHeadingProps) {
  const words = text.split(' ');

  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVars = {
    hidden: { opacity: 0, y: '100%', rotate: 4 },
    visible: {
      opacity: 1,
      y: '0%',
      rotate: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  return (
    <motion.h2
      id={id}
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15%' }}
      className={`font-display tracking-tight text-white flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] overflow-hidden py-1 ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.1em] pb-[0.05em]">
          <motion.span
            variants={wordVars}
            className="inline-block origin-bottom-left"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
