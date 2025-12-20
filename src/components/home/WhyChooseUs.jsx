import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper';
import Icon from '../common/Icon';

/**
 * Premium WhyChooseUs Section
 * Features: Multi-layered feature cards, animated check-lists,
 * and a "Trust Badge" visual anchor.
 */

const features = [
  {
    title: "Startup-First",
    desc: "We build MVP-ready products designed to scale from zero to millions of users without technical debt.",
    icon: "zap",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    title: "Performance",
    desc: "Zero-bloat architectures ensuring sub-second load times and perfect SEO scores across all devices.",
    icon: "services",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10"
  },
  {
    title: "Design-Led",
    desc: "Human-centric UI/UX that prioritizes conversion while maintaining breathtaking brand aesthetics.",
    icon: "design",
    color: "text-pink-500",
    bg: "bg-pink-500/10"
  },
  {
    title: "Reliable Support",
    desc: "Ongoing maintenance and rapid iteration cycles to keep your digital product ahead of the curve.",
    icon: "infoCircle",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  }
];

export default function WhyChooseUs() {
  return (
    <SectionWrapper className="relative overflow-hidden py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Visual/Branding Anchor */}
        <div className="relative order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900"
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
              alt="Strategic collaboration" 
              className="w-full h-auto object-cover aspect-[4/5] lg:aspect-auto"
            />
            
            {/* Overlay Glass Trust Card */}
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="absolute bottom-8 left-8 right-8 p-6 bg-white/20 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="Partner" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 bg-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    +50
                  </div>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Trusted by Industry Leaders</p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map(s => <Icon key={s} name="star" size={12} className="text-orange-400 fill-current" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Decorative background blurs */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] -z-10" />
          <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
        </div>

        {/* Right Side: Staggered Content List */}
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center lg:text-left"
          >
            <span className="text-orange-600 font-bold tracking-[0.25em] uppercase text-xs mb-4 block">
              The Vornix Standard
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 font-montserrat leading-tight">
              Engineering <span className="text-indigo-600">Confidence</span> into every pixel.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
              We don't just build websites; we architect digital assets that drive growth and command authority.
            </p>
          </motion.div>

          <div className="space-y-4">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group flex items-start gap-6 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-none transition-all duration-300 cursor-default"
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center transition-transform group-hover:rotate-12`}>
                  <Icon name={item.icon} className={item.color} size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}