'use client';

import { motion } from 'framer-motion';

interface StaggerParagraphProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function StaggerParagraph({ text, className = '', delay = 0 }: StaggerParagraphProps) {
  const sentences = text.split('. ').filter(Boolean);

  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  };

  const sentenceVars = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.p
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      className={`leading-relaxed text-muted-foreground ${className}`}
    >
      {sentences.map((sentence, index) => {
        const suffix = index < sentences.length - 1 || text.endsWith('.') ? '.' : '';
        return (
          <motion.span
            key={index}
            variants={sentenceVars}
            className="inline-block mr-1"
          >
            {sentence + suffix}
          </motion.span>
        );
      })}
    </motion.p>
  );
}
