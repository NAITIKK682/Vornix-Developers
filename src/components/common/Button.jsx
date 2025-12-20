import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  ...props
}) {
  // Base classes with improved focus states and smooth transitions
  const base = 'inline-flex items-center justify-center font-bold tracking-wide rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden active:scale-[0.98]';

  const variants = {
    // Primary: High-end gradient with shimmer effect
    primary: 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-200/50 hover:shadow-orange-300/60 focus-visible:ring-orange-400/50',
    
    // Secondary: Elegant outline with subtle fill hover
    secondary: 'border-2 border-orange-500 text-orange-600 bg-transparent hover:bg-orange-50/50 focus-visible:ring-orange-400/30',
    
    // Accent: Modern Cyan/Teal aesthetic
    accent: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-200/50 hover:shadow-cyan-300/60 focus-visible:ring-cyan-400/50',
    
    // Outline: Clean and minimal
    outline: 'border-2 border-slate-200 text-slate-700 bg-white hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400/30',
    
    // Ghost: Subtle interaction
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400/30',
    
    // Danger: High alert
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-200/50 focus-visible:ring-red-400/50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs h-9 gap-1.5',
    md: 'px-6 py-3 text-sm h-12 gap-2',
    lg: 'px-8 py-4 text-base h-14 gap-2.5'
  };

  const buttonClass = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <motion.button
      className={buttonClass}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      aria-busy={loading}
      {...props}
    >
      {/* Premium Shimmer Effect Overlay (only for primary/accent) */}
      {(variant === 'primary' || variant === 'accent') && !disabled && !loading && (
        <motion.div
          initial={{ x: '-100%', skewX: -20 }}
          whileHover={{ x: '150%', skewX: -20 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"
        />
      )}

      {/* Loading Spinner */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.span
            key="loader"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center"
          >
            <svg 
              className="animate-spin h-5 w-5 text-current" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </motion.span>
        ) : (
          <motion.div 
            key="content" 
            className="flex items-center justify-center gap-2 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {leftIcon && <span className="flex-shrink-0 transition-transform group-hover:scale-110">{leftIcon}</span>}
            <span className="truncate">{children}</span>
            {rightIcon && <span className="flex-shrink-0 transition-transform group-hover:scale-110">{rightIcon}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}