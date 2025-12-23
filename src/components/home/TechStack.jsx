import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper';
import { techData } from '../../data/techData';

/**
 * VORNIX ULTIMATE RESPONSIVE TECH STACK
 * Optimized for Mobile Swiping, 3D Icon Parallax, and Futuristic Glows.
 */

export default function TechStack() {
  const categories = useMemo(() => 
    Object.keys(techData).filter(cat => 
      cat !== 'mobile_app_solutions' && cat !== 'cloud_cyber_security'
    ), []
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const scrollRef = useRef(null);

  // --- ANIMATION VARIANTS ---
  const floatAnim = {
    y: [0, -10, 0],
    rotateX: [0, 5, 0],
    rotateY: [0, 10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };

  const streakAnim = {
    x: ['-100%', '100%'],
    transition: { duration: 2, repeat: Infinity, ease: "linear" }
  };

  return (
    <SectionWrapper className="relative bg-[#020205] py-16 md:py-32 overflow-hidden min-h-screen">
      
      {/* 1. FUTURISTIC BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.05)_0%,_transparent_50%)]" />
        {/* Animated Light Streaks */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent overflow-hidden">
          <motion.div animate={streakAnim} className="w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]" />
        </div>
        <div className="absolute bottom-1/3 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent overflow-hidden">
          <motion.div animate={streakAnim} className="w-1/3 h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* 2. HEADER: HIGH VISIBILITY BOLD TEXT */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
              Next-Gen Ecosystem
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none"
          >
            THE <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">VORNIX</span> STACK
          </motion.h2>
        </div>

        {/* 3. MOBILE NAVIGATION: SWIPEABLE WITH SIDE GRADIENTS */}
        <div className="relative mb-12 group">
          {/* Scroll Indicators (The Streaks) */}
          <div className="absolute -top-4 left-0 right-0 flex justify-between px-2 lg:hidden">
            <div className="text-[10px] text-cyan-500/50 font-bold uppercase tracking-widest flex items-center gap-1">
              <span className="animate-pulse">←</span> Swipe
            </div>
            <div className="text-[10px] text-cyan-500/50 font-bold uppercase tracking-widest flex items-center gap-1">
              Explore <span className="animate-pulse">→</span>
            </div>
          </div>

          {/* Masking Gradients for horizontal scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#020205] to-transparent z-20 pointer-events-none lg:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#020205] to-transparent z-20 pointer-events-none lg:hidden" />

          <div 
            ref={scrollRef}
            className="flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar pb-4 gap-3 px-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative flex-shrink-0 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeCategory === category ? 'text-white' : 'text-slate-500 hover:text-white'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-800 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  />
                )}
                <span className="relative z-10">{category.replace('_', ' ')}</span>
              </button>
            ))}
          </div>
          
          {/* Animated Scroll Line Indicator */}
          <div className="w-full h-[1px] bg-white/10 mt-2 relative overflow-hidden">
            <motion.div 
              animate={{ x: ['-100%', '300%'] }} 
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-0 left-0 w-1/4 h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" 
            />
          </div>
        </div>

        {/* 4. TECH GRID: FULLY VISIBLE & RESPONSIVE */}
        <div className="max-w-6xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {techData[activeCategory]?.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group relative flex flex-col items-center p-6 md:p-10 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] hover:border-cyan-500/50 transition-all duration-500"
                >
                  {/* Floating Icon with 3D shadow */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6">
                    <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
                    <motion.div 
                      animate={floatAnim}
                      className="relative z-10 w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-full h-full object-contain filter brightness-110 contrast-125 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${tech.name}&background=000&color=fff`; }}
                      />
                    </motion.div>
                  </div>
                  
                  <span className="text-[10px] md:text-xs font-black text-white group-hover:text-cyan-400 uppercase tracking-widest text-center transition-colors">
                    {tech.name}
                  </span>
                  
                  {/* Glow dot */}
                  <div className="absolute bottom-4 w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_#22d3ee]" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 5. FOOTER TRUST BAR */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 px-8 py-4 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-xl">
             <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border border-cyan-500/50 bg-black flex items-center justify-center text-[8px] text-cyan-400 font-bold">V</div>
                ))}
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               Enterprise Ready <span className="text-white">Global 500</span> Trusted
             </p>
          </div>
        </motion.div>

      </div>

      {/* Persistent CSS for Hidden Scrollbars */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </SectionWrapper>
  );
}