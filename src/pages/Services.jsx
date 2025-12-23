import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useTransform } from 'framer-motion';
import {
  FiGlobe,
  FiLayers,
  FiShare2,
  FiCheck,
  FiInfo,
  FiArrowRight,
  FiZap,
  FiTarget,
  FiAward,
  FiPlus,
  FiMinus,
  FiActivity,
  FiSmartphone,
  FiCode,
  FiCpu,
  FiSettings,
  FiExternalLink,
  FiShield,
  FiMonitor,
  FiMail,
  FiBarChart2,
  FiTerminal
} from 'react-icons/fi';

import SectionWrapper from '../components/common/SectionWrapper';
import Button from '../components/common/Button';

/* ==========================================================================
   CONSTANT DATA STRUCTURES (Expanded for Production Depth)
   ========================================================================== */

const TECH_MARQUEE = [
  "React.js", "Next.js", "TypeScript", "Node.js", "Python", "Django", "Flask", 
  "PostgreSQL", "MongoDB", "AWS", "Docker", "TailwindCSS", "Figma", "OpenAI", 
  "TensorFlow", "GraphQL", "Redis", "Google Cloud", "Kubernetes", "Express.js"
];

const SERVICES_DATA = [
  {
    id: "web-dev",
    title: 'Web Development',
    icon: <FiGlobe />,
    isPrimary: true,
    tagline: 'Enterprise Architecture',
    description: 'We engineer high-performance, scalable web solutions. From static landing pages to complex full-stack ecosystems, our builds are optimized for security, speed, and conversion.',
    features: [
      { title: 'Static Solutions', desc: 'Blazing fast landing pages and portfolios built with Next.js.' },
      { title: 'Dynamic Ecosystems', desc: 'Complex CMS, admin dashboards, and internal business tools.' },
      { title: 'Full-Stack Apps', desc: 'End-to-end applications with robust frontend and backend logic.' },
      { title: 'Performance & SEO', desc: 'Enterprise-grade optimization ensuring 99+ Core Web Vitals.' }
    ],
    techStack: {
      frontend: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      backend: ['Node.js', 'Express.js', 'Python (Django/Flask)', 'RESTful APIs', 'GraphQL', 'JWT Auth'],
      database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Supabase', 'Prisma']
    },
    color: 'from-blue-600 via-indigo-600 to-violet-700',
    stat: 'Scalable & Secure'
  },
  {
    id: "ai-auto",
    title: 'AI & Automation',
    icon: <FiCpu />,
    tagline: 'Intelligence Integration',
    description: 'Leverage the power of Artificial Intelligence to automate repetitive tasks, analyze complex data, and provide 24/7 intelligent customer support.',
    features: [
      { title: 'LLM Implementation', desc: 'Custom GPT-4, Claude, and Llama integration for business data.' },
      { title: 'Workflow Automation', desc: 'Connecting apps via n8n, Zapier, and custom Python scripts.' },
      { title: 'Predictive Analytics', desc: 'Data-driven growth experiments and behavior forecasting.' },
      { title: 'AI Chat Agents', desc: 'Human-like customer support agents trained on your documentation.' }
    ],
    techStack: {
      models: ['OpenAI API', 'LangChain', 'Hugging Face', 'Claude Anthropic'],
      tools: ['n8n', 'Zapier', 'Python Automation Scripts', 'Vector Databases (Pinecone)']
    },
    color: 'from-purple-600 via-fuchsia-600 to-pink-600',
    stat: 'Efficiency Redefined'
  },
  {
    id: "design-brand",
    title: 'Design & Branding',
    icon: <FiLayers />,
    tagline: 'Strategic Identity',
    description: 'Design is more than visuals; it is a strategy. We create human-centric design systems that bridge the gap between aesthetics and functional conversion.',
    features: [
      { title: 'UI/UX Architecture', desc: 'User-centric research and wireframing for web applications.' },
      { title: 'Brand Identity', desc: 'Logo design, typography, and cohesive visual language.' },
      { title: 'Design Systems', desc: 'Scalable, reusable component libraries for internal teams.' },
      { title: 'Prototyping', desc: 'Interactive Figma high-fidelity prototypes for stakeholder review.' }
    ],
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    stat: 'Elite UX/UI'
  },
  {
    id: "marketing",
    title: 'Digital Marketing',
    icon: <FiShare2 />,
    tagline: 'ROI Driven Growth',
    description: 'We position your brand where your customers are. Our marketing is technical, data-driven, and focused on transparent return on investment.',
    features: [
      { title: 'Technical SEO', desc: 'On-page and technical optimization for search engine dominance.' },
      { title: 'Lead Generation', desc: 'High-converting sales funnels and automated email marketing.' },
      { title: 'Performance Ads', desc: 'Data-backed social media and search engine marketing.' },
      { title: 'Growth Audit', desc: 'Regular data experiments to optimize conversion rates.' }
    ],
    color: 'from-emerald-500 via-teal-500 to-cyan-500',
    stat: 'Data-Backed Results'
  },
  {
    id: "mobile-soon",
    title: 'Mobile Solutions',
    icon: <FiSmartphone />,
    isComingSoon: true,
    tagline: 'Next Frontier',
    description: 'Our mobile development wing is currently being structured. We are assembling a team of elite React Native and Flutter engineers.',
    features: [
      { title: 'iOS Development', desc: 'Native-feel applications for the Apple ecosystem.' },
      { title: 'Android Solutions', desc: 'High-performance apps optimized for Android devices.' },
      { title: 'Cross-Platform', desc: 'Unified codebases for faster multi-platform deployment.' }
    ],
    color: 'from-slate-400 via-slate-500 to-slate-600',
    stat: 'Launching Q3 2025'
  }
];

const PROCESS_STEPS = [
  {
    id: '01',
    title: 'Discovery & Audit',
    desc: 'We analyze your current digital footprint, technical requirements, and market competitors.',
    icon: <FiMonitor />
  },
  {
    id: '02',
    title: 'Strategic Blueprint',
    desc: 'Architecture design, tech-stack selection (Node/Python), and UI/UX wireframing.',
    icon: <FiLayers />
  },
  {
    id: '03',
    title: 'Agile Development',
    desc: 'Bi-weekly sprints with transparent code access and regular progress demonstrations.',
    icon: <FiCode />
  },
  {
    id: '04',
    title: 'Quality Assurance',
    desc: 'Rigorous testing, vulnerability audits, and performance optimization.',
    icon: <FiShield />
  },
  {
    id: '05',
    title: 'Deployment & Scale',
    desc: 'Final launch with CI/CD pipelines and long-term scaling infrastructure.',
    icon: <FiZap />
  }
];

const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '₹4,999',
    period: 'per project',
    bestFor: 'Startups & Portfolios',
    features: [
      '1–3 Modern Pages',
      'Mobile Responsive Architecture',
      'SEO Fundamental Setup',
      'Standard Contact Form',
      '7 Days Post-Launch Support',
      'Free Domain Integration'
    ],
    highlight: false
  },
  {
    name: 'Professional',
    price: '₹9,999',
    period: 'per project',
    bestFor: 'Growing Businesses',
    features: [
      '5–10 Dynamic Pages',
      'Advanced UI/UX Design',
      'Custom Framer Motion Animations',
      'CMS / Blog Integration',
      'WhatsApp API Integration',
      '30 Days Dedicated Support',
      'Technical SEO Audit'
    ],
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'technical quote',
    bestFor: 'Agencies & Corporations',
    features: [
      'Unlimited Scalable Pages',
      'Python/Node Backend Logic',
      'Custom AI Agent Integration',
      'Database Architecture (SQL/NoSQL)',
      'Load Balancing & Cloud Setup',
      '24/7 Priority Support',
      'Security Vulnerability Testing'
    ],
    highlight: false
  }
];

const FAQS = [
  {
    question: "Which backend technology do you recommend?",
    answer: "It depends on your needs. For real-time applications and rapid scaling, we use Node.js. For data-heavy tasks, AI integration, and complex logic, we recommend Python (Django or Flask)."
  },
  {
    question: "Do you offer custom AI development?",
    answer: "Yes. We can build custom wrappers around LLMs like GPT-4, automate your internal business workflows using Python, and create intelligent agents trained on your specific data."
  },
  {
    question: "How do you handle project payments?",
    answer: "We typically work on a milestone-based payment structure: 40% upfront, 40% after the development phase, and 20% upon final delivery and deployment."
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Absolutely. We perform a full technical audit of your current site, identify performance bottlenecks, and provide a modern React/Next.js migration plan."
  },
  {
    question: "Is mobile responsiveness included?",
    answer: "In 2025, mobile-first is not an option; it is a requirement. Every project we build is fully responsive across all screen sizes from the first line of code."
  }
];

/* ==========================================================================
   ANIMATION VARIANTS
   ========================================================================== */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */

/**
 * Marquee for Technical Stack
 */
const TechMarquee = () => {
  return (
    <div className="relative py-10 bg-slate-900 overflow-hidden select-none border-y border-white/5">
      <div className="flex w-[200%] animate-marquee">
        {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
          <div key={i} className="flex items-center mx-8 text-white/30 font-black text-2xl tracking-tighter uppercase italic">
            <FiTerminal className="mr-3 text-indigo-500" />
            {tech}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

/**
 * FAQ Accordion Item
 */
const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      className={`border-b border-slate-200 py-6 px-4 rounded-2xl transition-all duration-300 ${isOpen ? "bg-white shadow-lg shadow-slate-100" : "bg-transparent"}`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-lg md:text-xl font-bold text-slate-800 pr-4">{faq.question}</span>
        <span className={`p-2 rounded-full shrink-0 transition-all ${isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'}`}>
          {isOpen ? <FiMinus /> : <FiPlus />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            <p className="pt-4 text-slate-500 leading-relaxed text-base md:text-lg">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * Feature Detail Card (Sub-grid in service card)
 */
const FeatureItem = ({ title, desc }) => (
  <div className="group/feature">
    <h5 className="text-sm font-black text-slate-900 mb-1 flex items-center gap-2">
      <FiCheck className="text-indigo-500 group-hover/feature:scale-125 transition-transform" />
      {title}
    </h5>
    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

/* ==========================================================================
   MAIN SERVICES COMPONENT
   ========================================================================== */

export default function Services() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleInquiry = () => {
    // Navigate and scroll to contact form section
    navigate('/contact');
    setTimeout(() => {
      const contactForm = document.getElementById('contact-form');
      if (contactForm) contactForm.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div ref={containerRef} className="bg-[#F8FAFC] min-h-screen font-poppins selection:bg-indigo-600 selection:text-white relative overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 origin-left z-[2000] shadow-[0_0_15px_rgba(79,70,229,0.5)]" 
        style={{ scaleX }} 
      />

      <div className="pt-1.5">
        
        {/* 1. HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-56 md:pb-40 overflow-hidden bg-white">
          {/* Ambient Background Elements */}
          <div className="absolute top-0 right-0 w-[400px] md:w-[900px] h-[400px] md:h-[900px] bg-indigo-50/50 rounded-full blur-[100px] md:blur-[150px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-50/50 rounded-full blur-[80px] md:blur-[120px] translate-y-1/2 -translate-x-1/4" />
          
          <SectionWrapper>
            <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.25em] mb-10 shadow-2xl"
              >
                <FiZap className="text-yellow-400" /> Premium Technical Partner
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl sm:text-7xl md:text-9xl font-black text-slate-900 mb-10 leading-[1] md:leading-[0.85] tracking-tighter"
              >
                Solutions that <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500">Scale Globally.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="text-slate-500 text-lg md:text-2xl max-w-4xl mx-auto font-medium leading-relaxed mb-16 px-4"
              >
                We bridge the gap between complex engineering and conversion-focused design. 
                From Python-powered backends to autonomous AI agents, we build the future of digital business.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center gap-5 px-6"
              >
                <Button onClick={handleInquiry} size="xl" className="bg-slate-900 text-white hover:bg-indigo-600 hover:scale-105 px-12 py-6 rounded-2xl font-bold shadow-2xl transition-all duration-300">
                  Book Technical Consultation
                </Button>
                <Button variant="outline" size="xl" className="px-12 py-6 rounded-2xl font-bold border-2 border-slate-200 hover:bg-slate-50">
                  View Tech Stack
                </Button>
              </motion.div>
            </div>
          </SectionWrapper>
        </section>

        {/* 2. STATS & MARQUEE */}
        <TechMarquee />
        
        <section className="bg-white border-b border-slate-100 py-16">
          <SectionWrapper>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
              {[
                { icon: <FiCheck />, label: 'Delivered Projects', val: '15+' },
                { icon: <FiActivity />, label: 'Avg Performance', val: '98%' },
                { icon: <FiTarget />, label: 'ROI Improvement', val: '4.5x' },
                { icon: <FiAward />, label: 'Agency Rating', val: '4.8/5' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left group cursor-default">
                  <span className="text-4xl md:text-5xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors tracking-tighter">{stat.val}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-indigo-500">{stat.icon}</span> {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </section>

        {/* 3. PRIMARY SERVICES GRID */}
        <section id="services-grid" className="py-24 md:py-40 bg-[#F8FAFC]">
          <SectionWrapper>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-24 px-4">
              <div className="max-w-3xl">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Expertise Catalog</motion.span>
                <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-none">Our Core Services.</h2>
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                  We specialize in building robust, production-ready systems. Whether you need a 
                  high-performance frontend or a complex Python-based AI engine, our team 
                  delivers enterprise-grade code every time.
                </p>
              </div>
              <div className="hidden lg:block w-32 h-1 bg-indigo-600 mb-6 rounded-full" />
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 px-4"
            >
              {SERVICES_DATA.map((service) => (
                <motion.div 
                  key={service.id} 
                  variants={fadeInUp}
                  className={`${service.isPrimary ? 'md:col-span-2' : 'col-span-1'}`}
                >
                  <div className={`group relative h-full bg-white p-8 md:p-14 rounded-[3rem] md:rounded-[4rem] border border-slate-100 shadow-sm transition-all duration-700 ${service.isComingSoon ? 'opacity-60 grayscale-[0.5]' : 'hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] hover:-translate-y-4'}`}>
                    
                    {/* Decorative Gradient Background */}
                    <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] rounded-full blur-3xl transition-opacity duration-700`} />
                    
                    {service.isPrimary && (
                      <div className="absolute top-8 right-8 md:top-14 md:right-14 bg-indigo-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hidden sm:block shadow-lg">
                        Core Agency Strength
                      </div>
                    )}

                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-gradient-to-br ${service.color} text-white flex items-center justify-center text-3xl md:text-4xl mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                      {service.icon}
                    </div>

                    <div className={`mb-6 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block ${service.isComingSoon ? 'bg-slate-100 text-slate-500' : 'bg-indigo-50 text-indigo-500'}`}>
                      {service.stat}
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-500 text-lg md:text-xl mb-12 leading-relaxed font-medium max-w-4xl">
                      {service.description}
                    </p>

                    {/* Extended Technical Breakdown for Web Development */}
                    {service.techStack && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14 border-y border-slate-100 py-10">
                        {Object.entries(service.techStack).map(([category, techs]) => (
                          <div key={category}>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">{category}</span>
                            <div className="flex flex-wrap gap-2">
                              {techs.map(tech => (
                                <span key={tech} className="text-[10px] md:text-[11px] bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-bold text-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-default">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Service Feature Grid */}
                    <div className={`grid ${service.isPrimary ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'} gap-8 mb-14`}>
                      {service.features.map((feature, idx) => (
                        <FeatureItem key={idx} title={feature.title} desc={feature.desc} />
                      ))}
                    </div>

                    {/* CTA Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      {!service.isComingSoon ? (
                        <Button 
                          onClick={handleInquiry} 
                          className="w-full sm:w-auto bg-slate-900 text-white hover:bg-indigo-600 px-10 py-5 rounded-2xl font-black transition-all duration-300 uppercase tracking-widest text-xs shadow-xl"
                        >
                          Inquire for {service.title}
                        </Button>
                      ) : (
                        <div className="w-full bg-slate-100 text-slate-400 text-center rounded-2xl py-5 font-black border border-dashed border-slate-300 text-xs uppercase tracking-[0.2em]">
                          Technical Team Forming
                        </div>
                      )}
                      
                      {!service.isComingSoon && (
                        <button className="text-slate-400 hover:text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn">
                          View Projects <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </SectionWrapper>
        </section>

        {/* 4. PROCESS SECTION (Visual Timeline) */}
        <section className="py-24 md:py-40 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-10 overflow-hidden relative">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <SectionWrapper>
            <div className="max-w-4xl mb-24 px-4 relative z-10">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-none">Our Delivery <br />Framework.</h2>
              <p className="text-slate-400 text-xl max-w-2xl leading-relaxed font-medium">
                We utilize a strictly agile methodology. Every project is broken down into 
                executable sprints with high-transparency reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10 px-4">
              {PROCESS_STEPS.map((step, idx) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.8 }}
                  className="relative group"
                >
                  <div className="text-7xl md:text-8xl font-black text-white/5 mb-6 group-hover:text-indigo-500/20 transition-colors duration-500 leading-none">
                    {step.id}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center text-xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">{step.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{step.desc}</p>
                  
                  {idx !== 4 && (
                    <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 text-white/10">
                      <FiArrowRight size={24} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </section>

        {/* 5. PRICING SECTION */}
        <section className="py-24 md:py-40 bg-[#F8FAFC]">
          <SectionWrapper>
            <div className="text-center max-w-3xl mx-auto mb-24 px-4">
              <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Pricing Tiers</span>
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">Investment Plans.</h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                Clear, high-value pricing. We believe in transparency without hidden 
                maintenance fees or deployment surprises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 px-4 items-start">
              {PRICING_PLANS.map((plan) => (
                <motion.div
                  key={plan.name}
                  whileHover={{ y: -15 }}
                  className={`p-10 md:p-14 rounded-[3rem] bg-white border transition-all duration-500 ${
                    plan.highlight 
                    ? 'border-indigo-500 shadow-[0_60px_100px_-30px_rgba(79,70,229,0.18)] relative z-10 md:scale-105' 
                    : 'border-slate-100 shadow-xl shadow-slate-200/50'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.25em] shadow-xl">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-black mb-2 text-slate-900 tracking-tight">{plan.name}</h3>
                  <p className="text-slate-400 text-[10px] mb-10 uppercase font-black tracking-widest">{plan.bestFor}</p>
                  
                  <div className="mb-12">
                    <span className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">{plan.price}</span>
                    <span className="text-slate-400 text-sm ml-3 font-bold lowercase">/{plan.period}</span>
                  </div>

                  <div className="space-y-5 mb-14">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-4 text-sm text-slate-700 font-bold leading-tight">
                        <div className="mt-1 p-1 rounded-full bg-indigo-50 text-indigo-600 shrink-0">
                          <FiCheck size={14} />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={handleInquiry}
                    fullWidth 
                    className={`py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                      plan.highlight 
                      ? 'bg-indigo-600 text-white hover:bg-slate-900 shadow-2xl shadow-indigo-100' 
                      : 'bg-white border-2 border-slate-200 text-slate-900 hover:border-indigo-600 hover:text-indigo-600'
                    }`}
                  >
                    Select {plan.name} Plan
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Custom Quote Notice */}
            <div className="mt-20 p-10 rounded-[2.5rem] bg-indigo-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 mx-4 shadow-3xl">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white text-3xl shrink-0">
                  <FiSettings className="animate-spin-slow" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 italic">Need custom engineering?</h4>
                  <p className="text-indigo-200/80 font-medium">We offer tailored Python/Node/AI quotes for specific enterprise requirements.</p>
                </div>
              </div>
              <Button onClick={handleInquiry} variant="outline" className="font-black text-xs uppercase tracking-widest border-2 border-white/20 text-white hover:bg-white hover:text-indigo-900 whitespace-nowrap px-10 py-5">Request Custom Quote</Button>
            </div>
          </SectionWrapper>
        </section>

        {/* 6. FAQ SECTION */}
        <section className="py-24 md:py-40 bg-white">
          <SectionWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-4">
              <div>
                <div className="sticky top-32">
                  <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Knowledge Base</span>
                  <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">Common <br />Questions.</h2>
                  <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-sm mb-12">
                    Everything you need to know about our technical partnership, delivery timelines, and technology choices.
                  </p>
                  
                  <div onClick={handleInquiry} className="flex items-center gap-4 text-indigo-600 font-black tracking-[0.2em] text-xs uppercase group cursor-pointer transition-all hover:gap-6">
                    Still have questions? Reach out <FiArrowRight className="text-lg" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {FAQS.map((faq, i) => (
                  <FAQItem key={i} faq={faq} />
                ))}
              </div>
            </div>
          </SectionWrapper>
        </section>

        {/* 7. FINAL CONVERSION SECTION */}
        <section className="py-32 md:py-56 px-4">
          <SectionWrapper>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-[3.5rem] md:rounded-[5rem] p-12 md:p-32 text-center text-white relative overflow-hidden shadow-[0_100px_150px_-50px_rgba(0,0,0,0.4)]"
            >
              {/* Dynamic Animated Gradient */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[180px] -translate-y-1/2 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600 rounded-full blur-[180px] translate-y-1/2" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto">
                <FiCode className="text-6xl md:text-8xl text-indigo-400 mx-auto mb-12 animate-bounce" />
                <h2 className="text-4xl md:text-8xl font-black mb-12 tracking-tighter leading-[1] md:leading-[0.85]">
                  Ready to build <br />the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">future</span> of tech?
                </h2>
                <p className="text-slate-400 mb-16 max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                  We are currently accepting new projects. Schedule a 30-minute discovery call 
                  where we audit your current project and provide a clear roadmap for execution.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Button onClick={handleInquiry} className="bg-white text-slate-900 hover:bg-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 px-16 py-7 rounded-3xl font-black text-xl shadow-2xl group flex items-center gap-4">
                    Let's Build It <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>
                
                <div className="mt-16 flex items-center justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                  <FiMonitor className="text-4xl" />
                  <FiCpu className="text-4xl" />
                  <FiTerminal className="text-4xl" />
                  <FiDatabase className="text-4xl" />
                </div>
              </div>
            </motion.div>
          </SectionWrapper>
        </section>

      </div>
      
      {/* Global CSS for Animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .shadow-3xl {
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.2);
        }
        .shadow-4xl {
          box-shadow: 0 60px 150px -30px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

// Mock database icon since it wasn't in the initial imports
function FiDatabase(props) {
  return (
    <svg 
      stroke="currentColor" 
      fill="none" 
      strokeWidth="2" 
      viewBox="0 0 24 24" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      height="1em" 
      width="1em" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
}