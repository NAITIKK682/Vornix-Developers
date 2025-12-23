import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper';
import { techData } from '../../data/techData';

/**
 * Professional TechStack - Minimalist & High-Performance Edition
 * Features: Liquid navigation, Glassmorphism, and explicit category filtering.
 */

export default function TechStack() {
  // 1. Logic: Filter out unwanted categories
  const categories = useMemo(() => 
    Object.keys(techData).filter(cat => 
      cat !== 'mobile_app_solutions' && 
      cat !== 'cloud_cyber_security'
    ), []
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <SectionWrapper className="relative bg-[#FFFFFF] py-20 overflow-hidden">
      
      {/* 2. Aesthetic Background: Subtle Glass & Grain */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-50/40 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-50/40 blur-[120px] rounded-full mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* 3. Professional Header: Minimalist Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-12 h-[1px] bg-indigo-600" />
              <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px]">
                Technical Superiority
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 italic">Vornix</span> Stack.
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 text-sm md:text-base font-medium max-w-xs md:text-right"
          >
            Optimized for performance, security, and extreme scalability.
          </motion.p>
        </div>

        {/* 4. Navigation: Compact Liquid Pill Design */}
        <div className="flex justify-start md:justify-center mb-10">
          <nav className="flex p-1 bg-slate-100/50 backdrop-blur-md rounded-2xl border border-slate-200/50 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                  activeCategory === category ? 'text-white' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-slate-900 rounded-xl shadow-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.replace('_', ' ')}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* 5. Tech Grid: High-End Hover Effects */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {techData[activeCategory]?.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col items-center p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-indigo-500/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500"
                >
                  <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
                    {/* Subtle Glow behind icon */}
                    <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-500" />
                    
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="relative w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${tech.name}&background=f1f5f9&color=64748b`;
                      }}
                    />
                  </div>
                  
                  <span className="text-[11px] font-black text-slate-400 group-hover:text-slate-900 uppercase tracking-wider transition-colors">
                    {tech.name}
                  </span>

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-slate-100 group-hover:bg-indigo-500 transition-colors" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 6. Professional Footer: Micro-Detail */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-slate-100 bg-slate-50/50">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-white border border-slate-200" />
              ))}
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Trusted by <span className="text-slate-900">150+</span> Global Partners
            </p>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}