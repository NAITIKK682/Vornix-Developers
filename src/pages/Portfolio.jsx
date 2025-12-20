import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/common/SectionWrapper';
import Button from '../components/common/Button';

/**
 * PRODUCTION-READY PORTFOLIO PAGE
 * Includes: Filtering, Dynamic Statistics, Process Roadmap, and CTA.
 */

const CATEGORIES = ['All', 'Web Design', 'Mobile Apps', '3D Interactive', 'AI Solutions'];

const PROJECTS = [
  { 
    id: 1, 
    title: 'Nova Banking', 
    category: 'Web Design', 
    tech: ['React', 'Tailwind', 'Framer'], 
    img: '/images/portfolio/project-1.jpg',
    description: 'A revolutionary fintech platform focused on minimalist UX and high-security transactions.'
  },
  { 
    id: 2, 
    title: 'Arcturus AI', 
    category: 'AI Solutions', 
    tech: ['Python', 'Node.js', 'OpenAI'], 
    img: '/images/portfolio/project-2.jpg',
    description: 'Custom neural network visualization tool for monitoring deep learning models.'
  },
  { 
    id: 3, 
    title: 'Cyber Sphere', 
    category: '3D Interactive', 
    tech: ['Three.js', 'GLSL', 'React'], 
    img: '/images/portfolio/project-3.jpg',
    description: 'An immersive 3D landing page with custom shaders and interactive physics.'
  },
  { 
    id: 4, 
    title: 'Velocity Hub', 
    category: 'Mobile Apps', 
    tech: ['React Native', 'Firebase'], 
    img: '/images/portfolio/project-4.jpg',
    description: 'A logistics tracking app delivering real-time analytics to over 10k monthly users.'
  },
  { 
    id: 5, 
    title: 'Zenith Retail', 
    category: 'Web Design', 
    tech: ['Next.js', 'Shopify', 'GSAP'], 
    img: '/images/portfolio/project-5.jpg',
    description: 'Luxury e-commerce experience with seamless page transitions and high conversion rates.'
  },
  { 
    id: 6, 
    title: 'Pulse Health', 
    category: 'Mobile Apps', 
    tech: ['Flutter', 'AWS', 'HealthKit'], 
    img: '/images/portfolio/project-6.jpg',
    description: 'Personalized wellness tracking with wearable integration and AI health insights.'
  },
];

const STATS = [
  { label: 'Projects Completed', value: '150+' },
  { label: 'Happy Clients', value: '80+' },
  { label: 'Awards Won', value: '12' },
  { label: 'Years Experience', value: '8+' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = PROJECTS.filter(p => 
    filter === 'All' ? true : p.category === filter
  );

  return (
    <div className="bg-white selection:bg-blue-100 selection:text-blue-900">
      
      {/* SECTION 1: HERO HEADER */}
      <SectionWrapper className="pt-32 pb-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full"
          >
            Showcase
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Perform.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Explore our latest digital products where high-end design meets cutting-edge engineering.
          </motion.p>
        </div>
      </SectionWrapper>

      {/* SECTION 2: STATISTICS BAR */}
      <div className="border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: FILTERING & GRID */}
      <SectionWrapper className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter UI */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100 mb-6">
                    {/* Background fallback text if image missing */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest">
                      {project.title}
                    </div>
                    {/* Actual Project Image */}
                    <img 
                      src={project.img} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => e.target.style.opacity = 0}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="glass">View Details</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{project.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* SECTION 4: OUR PROCESS */}
      <SectionWrapper className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">How we bring your <br/> ideas to <span className="text-blue-400">life.</span></h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Strategy', desc: 'We align your business goals with user needs.' },
                  { step: '02', title: 'Design', desc: 'Crafting premium visuals and intuitive interfaces.' },
                  { step: '03', title: 'Development', desc: 'Clean, scalable code built for high performance.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-blue-500 font-black text-xl">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-[100px] opacity-20 absolute inset-0" />
              <div className="relative bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl">
                <pre className="text-sm text-blue-300 font-mono">
                  <code>
                    {`// Standard Engineering Workflow
function shipProject(idea) {
  const blueprint = design(idea);
  const code = develop(blueprint);
  const test = validate(code);
  
  return optimize(test);
}

shipProject("Your Vision");`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* SECTION 5: FINAL CTA */}
      <SectionWrapper className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-slate-900 mb-6">Ready to start your project?</h2>
          <p className="text-slate-500 mb-10 text-lg">We are currently accepting new projects for Q3 2025. Let’s build something incredible together.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg">Contact Us Now</Button>
            <Button variant="outline" size="lg">Our Services</Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}