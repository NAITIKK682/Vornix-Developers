import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionWrapper from '../common/SectionWrapper';

/**
 * PREMIUM SERVICES PREVIEW
 * Features: Indian-contextualized service offerings, SVG icon system, 
 * glassmorphism card hover effects, and staggered reveal animations.
 */

const services = [
  { 
    id: '01',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9c1.657 0 3 4.03 3 9s-1.343 9-3 9m0-18c-1.657 0-3 4.03-3 9s1.343 9 3 9m-9-9a9 9 0 019-9" />
      </svg>
    ),
    title: 'Custom Web Engineering', 
    desc: 'Scalable React & Next.js platforms optimized for the diverse Indian connectivity landscape.',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: '02',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'AI & Automation', 
    desc: 'Empowering local enterprises with LLMs, smart chatbots, and automated supply chain workflows.',
    color: 'from-purple-500 to-indigo-600'
  },
  { 
    id: '03',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: 'UI/UX Design Strategy', 
    desc: 'Vernacular-friendly interfaces designed for the next billion users in the Indian digital ecosystem.',
    color: 'from-rose-500 to-orange-500'
  },
  { 
    id: '04',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Mobile App Solutions', 
    desc: 'High-performance Flutter & React Native apps built for high retention and seamless UPI integration.',
    color: 'from-emerald-500 to-teal-600'
  },
  { 
    id: '05',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Cloud & Cyber Security', 
    desc: 'Robust AWS/Azure hosting with Bharat-standard security protocols to keep your data sovereign.',
    color: 'from-amber-500 to-yellow-600'
  }
];

export default function ServicesPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <SectionWrapper className="bg-slate-50 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">
            Capabilities
          </span>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Comprehensive Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Solutions for India.</span>
          </h3>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-slate-500 text-lg max-w-sm border-l-2 border-blue-600 pl-6 hidden md:block"
        >
          Helping Indian startups and established brands scale through engineering excellence.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
      >
        {services.map((s) => (
          <motion.div 
            key={s.id} 
            variants={cardVariants}
            className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col items-start h-full overflow-hidden"
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -mr-10 -mt-10 rounded-full blur-3xl`} />
            
            {/* Numbering */}
            <span className="text-6xl font-black text-slate-50 absolute -right-2 top-8 group-hover:text-slate-100 transition-colors pointer-events-none select-none">
              {s.id}
            </span>

            {/* Icon Box */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
              {s.icon}
            </div>

            <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
              {s.title}
            </h4>
            
            <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
              {s.desc}
            </p>

            <Link 
              to={`/services#${s.id}`} 
              className="text-sm font-bold text-slate-900 flex items-center gap-2 group/link"
            >
              Learn More 
              <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        ))}

        {/* Final CTA Card */}
        <motion.div 
          variants={cardVariants}
          className="group p-10 rounded-[2.5rem] bg-slate-900 text-white flex flex-col justify-center items-center text-center h-full relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-600 opacity-10 group-hover:scale-150 transition-transform duration-700 rounded-full blur-[100px]" />
          <h4 className="text-2xl font-bold mb-4 relative z-10">Have a unique requirement?</h4>
          <p className="text-slate-400 mb-8 relative z-10 text-sm">We specialize in bespoke software solutions tailored to your specific business logic.</p>
          <Link to="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl relative z-10 hover:bg-blue-50 transition-colors"
            >
              Custom Inquiry
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Mobile Footer Link */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 text-center md:hidden"
      >
        <Link 
          to="/services" 
          className="text-blue-600 font-bold text-lg inline-flex items-center gap-2"
        >
          All Services <span className="text-2xl">→</span>
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}