import React from 'react';
import { motion } from 'framer-motion';

export default function SectionWrapper({
  children,
  className = '',
  id = '',
  bgColor = '',
  variant = 'default',
  withDots = false,
  containerClass = '',
}) {
  // Sophisticated background styles
  const variants = {
    default: 'bg-white',
    light: 'bg-gradient-to-b from-slate-50/50 to-white',
    dark: 'bg-[#0f172a] text-slate-200',
    gradient: 'bg-gradient-to-br from-orange-50/50 via-white to-rose-50/30',
    glass: 'bg-white/40 backdrop-blur-md border-y border-white/20',
  };

  // Stagger logic for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Standard entrance animation for the wrapper itself
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98] // Professional cubic-bezier
      } 
    },
  };

  return (
    <motion.section
      id={id}
      className={`relative py-20 md:py-24 lg:py-32 overflow-hidden ${variants[variant] || bgColor} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Optional Decorative Dot Pattern */}
      {withDots && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]">
          <svg className="h-full w-full" fill="none">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-slate-300" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      )}

      {/* Decorative Blur Blobs for "gradient" variant */}
      {variant === 'gradient' && (
        <>
          <div className="absolute top-0 -left-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-[100px] -z-10" />
        </>
      )}

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClass}`}>
        <motion.div variants={fadeUp}>
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}