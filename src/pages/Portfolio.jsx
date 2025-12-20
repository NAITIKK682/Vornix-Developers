import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import SectionWrapper from '../components/common/SectionWrapper';
import Button from '../components/common/Button';

/**
 * 🚀 ENTERPRISE-GRADE UNIVERSAL PORTFOLIO (V2.0)
 * * DESIGN SPECIFICATIONS:
 * - Desktop View: Landscape (16:9) Cinematic Cards
 * - Interaction: Dual-action Image Hover (View Details | Live Link)
 * - Architecture: Scalable Component Architecture with Framer Motion
 * - Line Count: 600+ Lines of Production Logic
 */

// --- DATA: CATEGORIES & EXTENDED PROJECTS ---

const CATEGORIES = [
  'All',
  'Web Development',
  'AI & Automation',
  'Design & Branding',
  'Digital Marketing',
  'Support & Security'
];

const PROJECTS = [
  // 1. WEB DEVELOPMENT - E-COMMERCE
  {
    id: 1,
    title: 'TasteMelt Luxury Store',
    category: 'Web Development',
    type: 'E-Commerce Solutions',
    tech: ['Next.js 14', 'Stripe', 'Tailwind', 'Sanity.io'],
    img: '/images/portfolio/web-1.jpg',
    liveUrl: 'https://tastemelt.vercel.app/',
    description: 'A high-conversion headless commerce engine with sub-100ms page loads, complex inventory management, and custom checkout flows.'
  },
  // 2. WEB DEVELOPMENT - WEB APPLICATIONS
  {
    id: 2,
    title: 'Quantum SaaS Dashboard',
    category: 'Web Development',
    type: 'Web Applications',
    tech: ['React', 'Node.js', 'Prisma', 'PostgreSQL'],
    img: '/images/portfolio/web-2.jpg',
    liveUrl: 'https://quantum.example.com',
    description: 'Enterprise-grade resource planning tool featuring real-time data sync, advanced permission layers, and dynamic reporting widgets.'
  },
  // 3. WEB DEVELOPMENT - PORTFOLIO & RESUME
  {
    id: 3,
    title: 'Persona Portfolio Pro',
    category: 'Web Development',
    type: 'Portfolio & Resume',
    tech: ['Framer Motion', 'React', 'GSAP', 'Three.js'],
    img: '/images/portfolio/web-3.jpg',
    liveUrl: 'https://persona.example.com',
    description: 'Immersive personal branding experience with scroll-triggered storytelling, 3D element integration, and high-fidelity transitions.'
  },
  // 4. WEB DEVELOPMENT - REAL ESTATE PORTAL
  {
    id: 4,
    title: 'Vanguard Realty Portal',
    category: 'Web Development',
    type: 'Web Applications',
    tech: ['TypeScript', 'Firebase', 'Algolia', 'Google Maps'],
    img: '/images/portfolio/web-4.jpg',
    liveUrl: 'https://vanguard.example.com',
    description: 'A global real estate platform with instant search, map integration, virtual tour capabilities, and lead management systems.'
  },
  // 5. WEB DEVELOPMENT - HEALTHCARE HUB
  {
    id: 5,
    title: 'Syncro Health Hub',
    category: 'Web Development',
    type: 'Web Applications',
    tech: ['React', 'AWS', 'GraphQL', 'Docker'],
    img: '/images/portfolio/web-5.jpg',
    liveUrl: 'https://syncro.example.com',
    description: 'HIPAA-compliant healthcare management system for patient records, appointment scheduling, and secure telehealth video calls.'
  },
  // 6. WEB DEVELOPMENT - MODERN BLOG
  {
    id: 6,
    title: 'Modernist Blog Engine',
    category: 'Web Development',
    type: 'Portfolio & Resume',
    tech: ['Astro', 'Markdown', 'Vercel', 'Edge Functions'],
    img: '/images/portfolio/web-6.jpg',
    liveUrl: 'https://blog.example.com',
    description: 'Ultra-lightweight content platform optimized for Perfect Lighthouse SEO scores and extremely fast mobile readability.'
  },
  // 7. AI & AUTOMATION
  {
    id: 7,
    title: 'FlowState Automator',
    category: 'AI & Automation',
    type: 'Workflow Automation',
    tech: ['Python', 'Zapier', 'OpenAI', 'Pinecone'],
    img: '/images/portfolio/ai-1.jpg',
    liveUrl: 'https://flow.example.com',
    description: 'Automated lead processing system that sorts, tags, and responds to 5,000+ emails monthly using LLM-based sentiment analysis.'
  },
  {
    id: 8,
    title: 'Neural Insights AI',
    category: 'AI & Automation',
    type: 'AI Integrations',
    tech: ['TensorFlow', 'Python', 'React', 'FastAPI'],
    img: '/images/portfolio/ai-2.jpg',
    liveUrl: 'https://neural.example.com',
    description: 'E-commerce recommendation engine that increased average order value by 32% through predictive user modeling.'
  },
  // 9. DESIGN & BRANDING
  {
    id: 9,
    title: 'Aura Brand Identity',
    category: 'Design & Branding',
    type: 'Graphic & Brand Design',
    tech: ['Figma', 'Illustrator', 'After Effects'],
    img: '/images/portfolio/design-1.jpg',
    liveUrl: 'https://aura.example.com',
    description: 'Comprehensive brand guidelines including logo, typography, and visual language for a sustainable tech startup.'
  },
  {
    id: 10,
    title: 'Zenith App UI/UX',
    category: 'Design & Branding',
    type: 'UI/UX Design',
    tech: ['Figma', 'Protopie', 'UserTesting'],
    img: '/images/portfolio/design-2.jpg',
    liveUrl: 'https://zenith.example.com',
    description: 'User-centric mobile app design focusing on accessibility, micro-interaction delight, and dark-mode optimization.'
  },
  // 11. DIGITAL MARKETING
  {
    id: 11,
    title: 'ViralGrowth Strategy',
    category: 'Digital Marketing',
    type: 'Account Handling',
    tech: ['Ads Manager', 'Buffer', 'Tableau'],
    img: '/images/portfolio/marketing-1.jpg',
    liveUrl: 'https://growth.example.com',
    description: 'Full-service social media management resulting in 400% follower growth and 25% increase in lead generation.'
  },
  // 12. SUPPORT & SECURITY
  {
    id: 12,
    title: 'Fortress Hosting',
    category: 'Support & Security',
    type: 'Hosting Setup',
    tech: ['Nginx', 'Docker', 'SSL', 'Cloudflare'],
    img: '/images/portfolio/support-1.jpg',
    liveUrl: 'https://fortress.example.com',
    description: 'High-availability server setup with automated backups, DDoS protection, and a 99.99% uptime guarantee.'
  }
];

const STATS = [
  { label: 'Successful Deployments', value: '20+' },
  { label: 'Client Retention Rate', value: '96%' },
  { label: 'Line of Code Written', value: '25k' },
  { label: 'Security Score', value: 'A+' },
];

const SERVICES = [
  {
    title: "Full-Stack Web Systems",
    desc: "Building scalable, headless architectures using Next.js and robust backend solutions.",
    icon: "🌐"
  },
  {
    title: "AI Integration",
    desc: "Leveraging LLMs and predictive models to automate complex business logic.",
    icon: "🧠"
  },
  {
    title: "Performance Audits",
    desc: "Hardening security and optimizing page speeds for sub-second global delivery.",
    icon: "⚡"
  }
];

// --- MAIN COMPONENT ---

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => filter === 'All' ? true : p.category === filter);
  }, [filter]);

  // Modal Scroll Lock
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    <div className="relative bg-white font-sans selection:bg-blue-600 selection:text-white">
      {/* GLOBAL SCROLL PROGRESS */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 z-[1000] origin-left" 
        style={{ scaleX }} 
      />

      {/* --- SECTION 1: DYNAMIC LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/98 p-4 md:p-12 backdrop-blur-3xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.button 
              className="absolute top-8 right-8 z-[1200] p-4 text-white/50 hover:text-white bg-white/10 rounded-full transition-all"
              whileHover={{ rotate: 90, scale: 1.1 }}
              onClick={() => setSelectedProject(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            <motion.div 
              layoutId={`img-${selectedProject.id}`}
              className="relative w-full max-w-7xl flex flex-col items-center gap-10 overflow-y-auto max-h-screen no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedProject.img} 
                alt={selectedProject.title}
                className="w-full aspect-video object-cover rounded-[2rem] shadow-[0_0_80px_rgba(37,99,235,0.2)] border border-white/10"
              />
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center max-w-4xl px-6"
              >
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="px-4 py-1 text-[10px] font-black text-blue-400 bg-blue-500/10 rounded-full uppercase tracking-widest border border-blue-500/20">{t}</span>
                  ))}
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
                  {selectedProject.title}
                </h2>
                <p className="text-slate-400 text-lg md:text-2xl leading-relaxed mb-12 font-medium">
                  {selectedProject.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="xl" className="px-12">Launch Project Experience</Button>
                  </a>
                  <Button variant="glass" size="xl" onClick={() => setSelectedProject(null)}>Return to Gallery</Button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SECTION 2: HERO (CORE VISION) --- */}
      <SectionWrapper className="pt-48 pb-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-400 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-400 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 mb-10 text-[10px] font-black tracking-[0.3em] text-blue-700 uppercase bg-blue-100/50 border border-blue-200 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            2025 Digital Product Studio
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-black text-slate-900 mb-10 tracking-tighter leading-[0.85]"
          >
            Architecting <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">The Future.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl text-slate-500 max-w-4xl mx-auto leading-relaxed mb-16 font-medium"
          >
            High-performance web solutions, tailored AI ecosystems, and premium brand identities engineered for global scale.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Button variant="primary" size="xl" className="px-12 shadow-2xl shadow-blue-200">Start Project Build</Button>
            <Button variant="outline" size="xl" className="px-12">View Portfolio Grid</Button>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* --- SECTION 3: STRATEGY & METRICS --- */}
      <div className="bg-white border-y border-slate-100 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECTION 4: MAIN PROJECT GALLERY --- */}
      <SectionWrapper className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
                Featured <br/>Solutions.
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                A selection of high-impact products filtered by specialized technical discipline.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                    filter === cat 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xl scale-105' 
                      : 'bg-white text-slate-400 border-slate-200 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* PROJECT GRID - 2 COLUMNS FOR LANDSCAPE IMPACT */}
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  {/* LANDSCAPE IMAGE WITH LIVE LINK BUTTON OVERLAY */}
                  <div 
                    className="relative aspect-video overflow-hidden rounded-[2.5rem] bg-slate-100 mb-10 cursor-zoom-in transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)]"
                    onClick={() => setSelectedProject(project)}
                  >
                    <motion.img 
                      layoutId={`img-${project.id}`}
                      src={project.img} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                    />
                    
                    {/* HOVER OVERLAY SYSTEM */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[3px] flex items-center justify-center">
                      <div className="flex flex-col sm:flex-row gap-4 px-6 scale-90 group-hover:scale-100 transition-transform duration-500">
                        {/* Action 1: Full View */}
                        <Button 
                          variant="white" 
                          size="md" 
                          className="font-black uppercase tracking-widest text-[10px]"
                          onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                        >
                          View Details
                        </Button>
                        
                        {/* Action 2: DIRECT LIVE LINK BUTTON */}
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button 
                            variant="primary" 
                            size="md" 
                            className="font-black uppercase tracking-widest text-[10px]"
                          >
                            Live Demo 
                            <svg className="ml-2 w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </Button>
                        </a>
                      </div>
                    </div>
                    
                    {/* Floating Status Tag */}
                    <div className="absolute top-8 left-8">
                      <span className="px-6 py-2 bg-white/90 backdrop-blur-md shadow-xl rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* PROJECT TEXT CONTENT */}
                  <div className="px-2">
                    <div className="flex flex-wrap gap-4 mb-6">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t}</span>
                      ))}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors tracking-tighter leading-none">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium line-clamp-2 max-w-2xl">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* --- SECTION 5: TECHNICAL SERVICES --- */}
      <SectionWrapper className="py-40 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {SERVICES.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[3rem] border border-slate-200 hover:border-blue-500 transition-colors group shadow-sm hover:shadow-2xl"
              >
                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform inline-block">{service.icon}</div>
                <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{service.title}</h4>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* --- SECTION 6: THE DEVELOPMENT PLAYBOOK --- */}
      <SectionWrapper className="py-40 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter leading-none">
                Logic <br/>
                <span className="text-blue-500">Driven.</span>
              </h2>
              <div className="space-y-16">
                {[
                  { step: '01', title: 'Blueprint & Analysis', desc: 'Detailed technical scoping, competitor benchmarking, and user persona mapping.' },
                  { step: '02', title: 'Agile Infrastructure', desc: 'Iterative development sprints with continuous integration and automated testing.' },
                  { step: '03', title: 'Optimization & Security', desc: 'Sub-second speed optimization and enterprise-grade security hardening.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-10 group">
                    <span className="text-blue-500 font-black text-4xl opacity-50 group-hover:opacity-100 transition-opacity">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-[200px] opacity-10" />
              <div className="relative bg-slate-800/40 border border-slate-700/50 p-12 rounded-[3.5rem] shadow-4xl backdrop-blur-xl overflow-hidden">
                <div className="flex gap-2 mb-10">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <pre className="text-sm md:text-base text-blue-300 font-mono leading-loose">
                  <code>
                    {`/**
 * @class ProductionEngine
 * @description Highly scalable system logic
 */
class GrowthStrategy {
  constructor(vision) {
    this.blueprint = vision;
    this.stack = ['Next.js', 'AI', 'Cloud'];
  }

  async execute() {
    await this.research();
    const core = await this.deploySaaS();
    
    while(core.isActive) {
      await this.optimize(core);
      await this.scale(core);
    }
  }
}

export default new GrowthStrategy('Dominance');`}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* --- SECTION 7: DETAILED FAQ --- */}
      <SectionWrapper className="py-40 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">Clarifications.</h2>
            <p className="text-xl text-slate-500 font-medium">Standard technical and operational procedures for all partnerships.</p>
          </div>
          <div className="space-y-6">
            {[
              { q: 'What is the average turnaround for a Web System?', a: 'Standard enterprise builds range from 8 to 14 weeks depending on the complexity of API integrations and UI requirements.' },
              { q: 'Do you provide continuous technical support?', a: 'Yes, we offer monthly SLA-driven maintenance packages covering security updates, performance monitoring, and feature updates.' },
              { q: 'Can you integrate AI into existing legacy software?', a: 'Our specialization is in building middleware AI layers that connect legacy data to modern LLM-driven interfaces.' },
              { q: 'What payment infrastructures do you support?', a: 'We are certified partners for Stripe, Adyen, and PayPal, supporting global multi-currency transactions.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-[2rem] border border-slate-200 p-8 cursor-pointer hover:border-blue-500 transition-colors">
                <summary className="flex items-center justify-between font-black text-xl text-slate-900 list-none">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180 bg-slate-100 p-2 rounded-full">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </summary>
                <p className="mt-6 text-slate-500 text-lg leading-relaxed font-medium border-t border-slate-50 pt-6">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* --- SECTION 8: FINAL CONVERSION CTA --- */}
      <SectionWrapper className="py-48 text-center bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:40px_40px]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-slate-900 mb-12 tracking-tighter leading-none"
          >
            Ready for <br/> 
            <span className="text-blue-600 italic">Impact?</span>
          </motion.h2>
          <p className="text-2xl text-slate-500 mb-16 font-medium max-w-3xl mx-auto leading-relaxed">
            We are currently opening consultation slots for Q2 2026. Join the ecosystem of companies redefining their digital presence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button variant="primary" size="xl" className="px-16 py-8 shadow-3xl shadow-blue-200">Start Your Consultation</Button>
            <Button variant="outline" size="xl" className="px-16 py-8">Schedule A Call</Button>
          </div>
        </div>
      </SectionWrapper>
      
      {/* --- END OF SECTIONS (FOOTER REMOVED AS REQUESTED) --- */}
    </div>
  );
}