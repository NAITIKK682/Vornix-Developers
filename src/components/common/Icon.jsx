import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const iconList = {
  // Navigation & Branding
  home: (p) => <path d="M3 12l9-9 9 9v1H21v7a2 2 0 01-2 2h-3v-4a2 2 0 00-4 0v4H5a2 2 0 01-2-2V13H3z" {...p} />,
  services: (p) => <path d="M20 7h-4V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 4h6v3H9V4z" {...p} />,
  portfolio: (p) => <><rect x="3" y="3" width="18" height="18" rx="2" {...p} /><path d="M9 11l3 3 5-5" {...p} /></>,
  contact: (p) => <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" {...p} /><path d="M22 6L12 13 2 6" {...p} /></>,
  
  // ADDED: Startup Icons (Zap and Rocket)
  zap: (p) => <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" {...p} />,
  rocket: (p) => <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3m5.99-5.99l-5.64 5.64a4.41 4.41 0 0 0-1.33 2.05l-.18.66l2.13 2.13l.66-.18a4.41 4.41 0 0 0 2.05-1.33l5.64-5.64a4.34 4.34 0 0 0-1.33-7.66l-1.27-.3a1.1 1.1 0 0 0-1.32 1.32l.3 1.27a4.34 4.34 0 0 0 4.29 3.03z" {...p} />,

  // UI Elements
  menu: (p) => <path d="M3 6h18M3 12h18M3 18h16" {...p} />,
  close: (p) => <path d="M18 6L6 18M6 6l12 12" {...p} />,
  chevron: (p) => <path d="M9 6l6 6-6 6" {...p} />,
  search: (p) => <><circle cx="11" cy="11" r="8" {...p} /><path d="m21 21-4.35-4.35" {...p} /></>,
  arrow: (p) => <path d="M5 12h14M12 5l7 7-7 7" {...p} />,
  plus: (p) => <path d="M12 5v14M5 12h14" {...p} />,
  external: (p) => <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" {...p} /><polyline points="15 3 21 3 21 9" {...p} /><line x1="10" y1="14" x2="21" y2="3" {...p} /></>,

  // Status & Actions
  check: (p) => <polyline points="20 6 9 17 4 12" {...p} />,
  checkCircle: (p) => <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" {...p} /><polyline points="22 4 12 14.01 9 11.01" {...p} /></>,
  infoCircle: (p) => <><circle cx="12" cy="12" r="10" {...p} /><line x1="12" y1="16" x2="12" y2="12" {...p} /><line x1="12" y1="8" x2="12.01" y2="8" {...p} /></>,
  star: (p) => <polygon points="12 2 15.09 10.26 24 10.27 17.18 16.70 19.34 25.07 12 19.54 4.66 25.07 6.82 16.70 0 10.27 8.91 10.26 12 2" {...p} />,
  
  // Tech & Social
  github: (p) => <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58V22" {...p} />,
  linkedin: (p) => <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" {...p} /><rect x="2" y="9" width="4" height="12" {...p} /><circle cx="4" cy="4" r="2" {...p} /></>,
  twitter: (p) => <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" {...p} />,
  instagram: (p) => <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" {...p} /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" {...p} /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" {...p} /></>,

  // Specialties
  code: (p) => <polyline points="16 18 22 12 16 6 8 6 2 12 8 18" {...p} />,
  design: (p) => <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" {...p} />,
  web: (p) => <><circle cx="12" cy="12" r="10" {...p} /><line x1="2" y1="12" x2="22" y2="12" {...p} /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" {...p} /></>,
};

const Icon = memo(({ 
  name, 
  size = 24, 
  color = 'currentColor', 
  className = '', 
  animate = false,
  hoverColor,
  strokeWidth = 2,
  ...props 
}) => {
  const IconPath = iconList[name];

  if (!IconPath) {
    console.warn(`[Design System]: Icon "${name}" does not exist.`);
    return null;
  }

  const variants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: animate ? 1.15 : 1, 
      rotate: animate && name === 'rocket' ? -10 : 0, // Custom tilt for rocket
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={variants}
      className={cn(
        "inline-block flex-shrink-0 transition-colors duration-300",
        className
      )}
      role="img"
      aria-hidden="true"
      {...props}
    >
      <IconPath />
    </motion.svg>
  );
});

Icon.displayName = 'Icon';

export default Icon;
export { iconList as icons };