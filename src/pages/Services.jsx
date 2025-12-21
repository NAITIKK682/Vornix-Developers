import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  FiGlobe,
  FiCpu,
  FiLayers,
  FiShare2,
  FiShield,
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
  FiCode
} from 'react-icons/fi';

import SectionWrapper from '../components/common/SectionWrapper';
import Button from '../components/common/Button';

/* ================= DATA STRUCTURES ================= */

const services = [
  {
    id: 1,
    title: 'Web Development',
    icon: <FiGlobe />,
    description: 'High-performance digital products engineered for speed and conversion using the latest frameworks.',
    items: ['Full-stack Next.js Apps', 'Headless E-Commerce', 'PWA Development', 'Enterprise Dashboards'],
    color: 'from-blue-500 to-indigo-600',
    stat: '99.9% Uptime'
  },
  {
    id: 2,
    title: 'AI & Automation',
    icon: <FiCpu />,
    description: 'Integrating machine learning and LLMs into your workflow to reduce operational costs.',
    items: ['GPT-4 & Claude Integration', 'n8n/Zapier Automation', 'Predictive Analytics', 'Custom AI Agents'],
    color: 'from-purple-500 to-pink-600',
    stat: '40% Time Saved'
  },
  {
    id: 3,
    title: 'Design & Branding',
    icon: <FiLayers />,
    description: 'Human-centric design systems that bridge the gap between aesthetics and functionality.',
    items: ['Atomic Design Systems', 'Visual Identity Strategy', 'Interactive Prototyping', 'Accessibility Audits'],
    color: 'from-orange-400 to-rose-500',
    stat: 'Elite UX/UI'
  },
  {
    id: 4,
    title: 'Digital Marketing',
    icon: <FiShare2 />,
    description: 'Growth-focused strategies designed to scale your brand across global digital channels.',
    items: ['Performance Marketing', 'SEO Optimization', 'Growth Experiments', 'Funnel Optimization'],
    color: 'from-cyan-400 to-blue-500',
    stat: '5x Lead Gen'
  },
  {
    id: 5,
    title: 'Cybersecurity',
    icon: <FiShield />,
    description: 'Hardened security and high-speed infrastructure setup for peace of mind and reliability.',
    items: ['SSL/Firewall Hardening', 'Vulnerability Audits', 'Cloud Migration', 'AWS/Vercel DevOps'],
    color: 'from-emerald-400 to-teal-600',
    stat: 'Zero-Leak Policy'
  },
  {
    id: 6,
    title: 'Mobile Solutions',
    icon: <FiSmartphone />,
    description: 'Native and cross-platform mobile apps built with React Native for maximum reach.',
    items: ['iOS & Android Apps', 'In-app Analytics', 'Push Notification Engines', 'Mobile UI Design'],
    color: 'from-yellow-400 to-orange-500',
    stat: 'Cross-Platform'
  }
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹4,999',
    period: 'per project',
    bestFor: 'Individuals & small startups',
    features: ['1–3 Pages', 'Responsive Design', 'Basic UI/UX', 'Contact Form', '7 Days Support', 'Free Domain (1yr)'],
    highlight: false
  },
  {
    name: 'Professional',
    price: '₹9,999',
    period: 'per project',
    bestFor: 'Growing businesses',
    features: [
      '5–7 Pages',
      'Advanced UI/UX',
      'Custom Animations',
      'SEO Infrastructure',
      'CMS Integration',
      'WhatsApp Integration',
      '30 Days Support'
    ],
    highlight: true
  },
  {
    name: 'Enterprise',
    price: '₹19,999+',
    period: 'custom pricing',
    bestFor: 'Brands & enterprises',
    features: [
      'Unlimited Pages',
      'Custom Logic/APIs',
      'Database Architecture',
      'Load Balancing',
      'Vulnerability Testing',
      'Priority 24/7 Support'
    ],
    highlight: false
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'Deep dive into your business goals, target audience, and technical constraints.'
  },
  {
    step: '02',
    title: 'Architecture',
    desc: 'Mapping out the technical stack, user flows, and wireframing the interface.'
  },
  {
    step: '03',
    title: 'Execution',
    desc: 'Rapid development with weekly sprints and transparent progress tracking.'
  },
  {
    step: '04',
    title: 'Optimization',
    desc: 'Hardening security, optimizing performance, and scaling for launch.'
  }
];

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "For standard websites, we deliver in 7-14 days. Enterprise systems and custom AI integrations typically take 4-8 weeks depending on complexity."
  },
  {
    question: "Do you provide maintenance after launch?",
    answer: "Absolutely. We offer various support tiers ranging from basic bug fixes to proactive 24/7 performance monitoring and security updates."
  },
  {
    question: "Can you work with existing tech stacks?",
    answer: "Yes, our engineers are proficient in React, Next.js, Node.js, Python, and legacy migrations. We can seamlessly integrate with your current systems."
  },
  {
    question: "Is SEO included in the development process?",
    answer: "Standard SEO (meta tags, fast loading, mobile optimization) is included in every build. We also offer advanced SEO strategy as a dedicated service."
  }
];

/* ================= ANIMATION PRESETS ================= */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

/* ================= SUB-COMPONENTS ================= */

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      variants={fadeInUp}
      className={`border-b border-slate-200 py-6 transition-all ${isOpen ? "bg-white" : ""}`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-xl font-bold text-slate-800">{faq.question}</span>
        <span className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
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
            <p className="pt-4 text-slate-500 leading-relaxed text-lg">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ================= MAIN COMPONENT ================= */

export default function Services() {
  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-poppins selection:bg-indigo-600 selection:text-white relative">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 origin-left z-[1000]"
        style={{ scaleX }}
      />

      <div className="pt-1.5">
        {/* 1. HERO SECTION */}
        <section className="relative pt-40 pb-32 overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
          
          <SectionWrapper>
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] mb-8 border border-indigo-100"
              >
                <FiZap className="animate-pulse" /> Engineering Excellence
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter"
              >
                Services that scale <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500">
                  your ambition.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-12"
              >
                From custom AI agents to high-conversion commerce engines, we build technical foundations that dominate markets.
              </motion.p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button size="xl" className="bg-slate-900 text-white hover:bg-indigo-600 px-10 py-5 rounded-2xl font-bold shadow-xl">
                  View Pricing
                </Button>
                <Button variant="outline" size="xl" className="px-10 py-5 rounded-2xl font-bold border-2">
                  Technical Stack
                </Button>
              </div>
            </div>
          </SectionWrapper>
        </section>

        {/* 2. STATS STRIP */}
        <section className="bg-white border-y border-slate-100 py-12">
          <SectionWrapper>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <FiCheck />, label: 'Projects Delivered', val: '20+' },
                { icon: <FiActivity />, label: 'Avg Speed Boost', val: '96%' },
                { icon: <FiTarget />, label: 'Client Retention', val: '98%' },
                { icon: <FiAward />, label: 'Positive Reviews', val: '4.9/5' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left group">
                  <span className="text-3xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors tracking-tighter">{stat.val}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-indigo-500">{stat.icon}</span> {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </section>

        {/* 3. MAIN SERVICES GRID */}
        <SectionWrapper className="py-32">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">Our Expertise.</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                We don't just write code; we solve business problems. Each service is tailored to maximize your digital ROI.
              </p>
            </div>
            <div className="h-1 bg-slate-200 w-full lg:w-32 hidden lg:block mb-4" />
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {services.map(service => (
              <motion.div key={service.id} variants={fadeInUp}>
                <div className="group relative h-full bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 overflow-hidden">
                  {/* Decorative background circle */}
                  <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${service.color} opacity-[0.03] group-hover:opacity-10 rounded-full transition-opacity duration-500`} />
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center text-2xl mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {service.icon}
                  </div>

                  <div className="mb-4 text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full inline-block">
                    {service.stat}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-10">
                    {service.items.map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm text-slate-700 font-semibold group/item">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover/item:scale-150 transition-transform" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-slate-50 text-slate-900 hover:bg-slate-900 hover:text-white rounded-2xl py-4 font-bold transition-all border border-slate-100">
                    Inquire Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>

        {/* 4. TECHNICAL PROCESS (TIMELINE) */}
        <section className="py-32 bg-slate-900 text-white rounded-[4rem] mx-4 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#4f46e5,transparent_50%)]" />
          </div>
          
          <SectionWrapper>
            <div className="max-w-4xl mb-24">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">How we work.</h2>
              <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
                Our systematic approach ensures every project is delivered on time, within budget, and at elite technical standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group"
                >
                  <div className="text-6xl font-black text-white/10 mb-6 group-hover:text-indigo-500 transition-colors duration-500 leading-none">
                    {step.step}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 tracking-tight">{step.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{step.desc}</p>
                  {idx !== 3 && <FiArrowRight className="hidden lg:block absolute -right-6 top-8 text-white/20 text-2xl" />}
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </section>

        {/* 5. PRICING SECTION */}
        <section className="py-32 bg-[#F8FAFC]">
          <SectionWrapper>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">Investment Plans.</h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Simple, transparent pricing. No hidden fees. Select the plan that matches your current growth stage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {pricingPlans.map(plan => (
                <motion.div
                  key={plan.name}
                  whileHover={{ y: -10 }}
                  className={`p-10 rounded-[3rem] bg-white border transition-all duration-500 ${
                    plan.highlight 
                    ? 'border-indigo-500 shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] relative z-10 scale-105' 
                    : 'border-slate-200 shadow-xl'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                      Recommended
                    </div>
                  )}
                  
                  <h3 className="text-xl font-black mb-1 text-slate-900 tracking-tight">{plan.name}</h3>
                  <p className="text-slate-400 text-xs mb-8 uppercase font-bold tracking-widest">{plan.bestFor}</p>
                  
                  <div className="mb-10">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">{plan.price}</span>
                    <span className="text-slate-400 text-sm ml-2 font-bold lowercase">/{plan.period}</span>
                  </div>

                  <div className="space-y-4 mb-10">
                    {plan.features.map(feature => (
                      <div key={feature} className="flex items-center gap-3 text-sm text-slate-700 font-bold">
                        <div className="p-1 rounded-full bg-indigo-50 text-indigo-600">
                          <FiCheck className="text-[12px]" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button 
                    fullWidth 
                    className={`py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                      plan.highlight 
                      ? 'bg-indigo-600 text-white hover:bg-slate-900 shadow-xl shadow-indigo-100' 
                      : 'bg-white border-2 border-slate-200 text-slate-900 hover:border-indigo-600 hover:text-indigo-600'
                    }`}
                  >
                    Get Started
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 p-8 rounded-3xl bg-indigo-50/50 border border-indigo-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-600 text-xl">
                  <FiInfo />
                </div>
                <p className="text-slate-600 font-bold max-w-md">Looking for something more specific? We offer custom quotes for specialized engineering projects.</p>
              </div>
              <Button variant="outline" className="font-black text-xs uppercase tracking-widest border-2 whitespace-nowrap px-8 py-4">Custom Inquiry</Button>
            </div>
          </SectionWrapper>
        </section>

        {/* 6. FAQ SECTION */}
        <section className="py-32 bg-white">
          <SectionWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <div className="sticky top-32">
                  <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none">Common <br />Queries.</h2>
                  <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-sm">
                    Everything you need to know about our technical partnership and delivery process.
                  </p>
                  <div className="mt-12 flex items-center gap-4 text-indigo-600 font-black tracking-widest text-xs uppercase group cursor-pointer">
                    Reach out to support <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {faqs.map((faq, i) => (
                  <FAQItem key={i} faq={faq} index={i} />
                ))}
              </motion.div>
            </div>
          </SectionWrapper>
        </section>

        {/* 7. FINAL CONVERSION CTA */}
        <section className="py-40">
          <SectionWrapper>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-4xl"
            >
              {/* Animated Mesh Gradient Overlay */}
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[150px] -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[150px] translate-y-1/2" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto">
                <FiCode className="text-6xl text-indigo-400 mx-auto mb-10 animate-bounce" />
                <h2 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.85]">
                  Ready to build the <span className="italic text-indigo-400">future?</span>
                </h2>
                <p className="text-slate-400 mb-16 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                  Schedule a 30-minute technical roadmap session where we audit your current project and provide a clear execution plan.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button className="bg-white text-slate-900 hover:bg-indigo-500 hover:text-white transition-all px-14 py-6 rounded-3xl font-black text-lg shadow-2xl group flex items-center gap-3">
                    Book Free Audit <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </Button>
                  <div className="text-slate-500 font-bold text-sm tracking-widest uppercase">
                     Avg Response: 2 Hours
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionWrapper>
        </section>
      </div>
    </div>
  );
}