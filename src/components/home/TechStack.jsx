import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper';
import { techData } from '../../data/techData';

const categories = Object.keys(techData);

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <SectionWrapper className="bg-slate-50/50 dark:bg-slate-900/20 py-24 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16 px-4">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-orange-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block"
        >
          Our Arsenal
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          Modern Tech for <span className="text-indigo-600">Scale.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto text-base md:text-lg"
        >
          We leverage the latest industry-standard tools to build resilient, 
          future-proof digital products.
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl mx-auto px-4">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-24 z-20">
          <nav className="flex lg:flex-col p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto lg:overflow-visible no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative flex-1 lg:flex-none text-left px-6 py-4 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 outline-none whitespace-nowrap ${
                  activeCategory === category
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 capitalize flex items-center justify-between">
                  {category.replace('_', ' & ')}
                  {activeCategory === category && <span className="hidden lg:block ml-2">→</span>}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tech Grid */}
        <div className="w-full lg:w-3/4 min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {techData[activeCategory]?.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ 
                    delay: index * 0.04,
                    type: "spring",
                    stiffness: 300,
                    damping: 25 
                  }}
                  whileHover={{ y: -8, rotate: 1 }}
                  className="group relative flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-orange-500/50 transition-all shadow-sm hover:shadow-xl hover:shadow-orange-500/10"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  
                  {/* Icon Container with Error Handling */}
                  <div className="relative w-14 h-14 mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-full h-full object-contain filter group-hover:drop-shadow-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${tech.name}&background=random&color=fff`;
                      }}
                    />
                  </div>
                  
                  <span className="relative text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 text-center tracking-tight">
                    {tech.name}
                  </span>

                  {/* Corner Accent */}
                  <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-orange-500 group-hover:scale-150 transition-all" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}