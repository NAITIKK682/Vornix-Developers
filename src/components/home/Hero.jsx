import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import HeroScene from '../../three/HeroScene';

export default function Hero() {
  // New Animation: Blur & Entrance Perspective
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slightly slower for a more "cinematic" feel
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      filter: "blur(10px)", // Elements start blurred
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", // Becomes sharp as it arrives
      scale: 1,
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] // Custom "Expo" ease for smoothness
      } 
    },
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="hero-section min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          
          {/* TEXT SIDE */}
          <motion.div 
            className="space-y-6 md:space-y-8 z-10" 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible"
          >
            {/* Pulsing Tag */}
            <motion.div variants={itemVariants} className="inline-block">
               <div className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                 Innovation Hub
               </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-900">
              Transforming <br />
              <span className="bg-gradient-to-r from-orange-400 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                Concepts 
              </span> <br /> Into Reality
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
              We engineer bespoke software solutions that combine aesthetic excellence with technical precision.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5 pt-4">
              <Link to="/contact">
                <Button size="lg" className="px-10 rounded-full hover:scale-105 transition-transform">
                  Launch Project
                </Button>
              </Link>
              <Link to="/portfolio" className="group flex items-center gap-3 font-bold text-slate-900">
                <span className="h-[2px] w-8 bg-slate-900 transition-all group-hover:w-12"></span>
                View Work
              </Link>
            </motion.div>
          </motion.div>

          {/* VISUAL SIDE (Floating Effect) */}
          <motion.div 
            className="relative w-full aspect-square"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <motion.div 
              animate={floatingAnimation}
              className="w-full h-full rounded-[40px] overflow-hidden border border-white/20 bg-white/10 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative"
            >
              <HeroScene />
              
              {/* Animated Decorative Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-64 h-64 border-[1px] border-orange-500/20 rounded-full"
              />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}