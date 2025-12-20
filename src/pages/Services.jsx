import React from 'react';
import { motion } from 'framer-motion';
import {
  FiGlobe,
  FiCpu,
  FiLayers,
  FiShare2,
  FiShield,
  FiCheck,
  FiInfo,
  FiArrowRight
} from 'react-icons/fi';

import SectionWrapper from '../components/common/SectionWrapper';
import ServiceCard from '../components/common/ServiceCard'; // Ensure this matches your file structure
import Button from '../components/common/Button';

/* ================= SERVICES DATA ================= */
const services = [
  {
    id: 1,
    title: 'Web Development',
    icon: <FiGlobe />,
    description: 'High-performance digital products engineered for speed and conversion.',
    items: ['Full-stack Web Applications', 'E-Commerce Ecosystems', 'Progressive Web Apps (PWA)'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    title: 'AI & Automation',
    icon: <FiCpu />,
    description: 'Integrating intelligence into your workflow to save time and reduce costs.',
    items: ['Custom LLM Integrations', 'Workflow Automation', 'Predictive Analytics'],
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 3,
    title: 'Design & Branding',
    icon: <FiLayers />,
    description: 'Human-centric design systems that elevate your brand identity.',
    items: ['UI/UX Design Systems', 'Brand Strategy', 'Interactive Prototyping'],
    color: 'from-orange-400 to-rose-500'
  },
  {
    id: 4,
    title: 'Social Media Strategy',
    icon: <FiShare2 />,
    description: 'Data-driven marketing strategies to scale reach and engagement.',
    items: ['Growth Marketing', 'Content Planning', 'Community Management'],
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 5,
    title: 'Security & Hosting',
    icon: <FiShield />,
    description: 'Fast, secure and scalable cloud infrastructure.',
    items: ['AWS / GCP Hosting', 'Penetration Testing', '24/7 Maintenance'],
    color: 'from-emerald-400 to-teal-600'
  }
];

/* ================= PRICING DATA ================= */
const pricingPlans = [
  {
    name: 'Starter',
    price: '₹4,999',
    bestFor: 'Individuals & small startups',
    features: ['1–3 Pages', 'Responsive Design', 'Basic UI/UX', 'Contact Form', '7 Days Support'],
    highlight: false
  },
  {
    name: 'Professional',
    price: '₹9,999',
    bestFor: 'Growing businesses',
    features: [
      '5–7 Pages',
      'Advanced UI/UX',
      'Animations',
      'SEO Ready',
      'WhatsApp / Email Integration',
      '15 Days Support'
    ],
    highlight: true
  },
  {
    name: 'Enterprise',
    price: '₹19,999+',
    bestFor: 'Brands & enterprises',
    features: [
      'Unlimited Pages',
      'Custom UI/UX',
      'Backend / APIs',
      'Performance Optimization',
      'Priority Support'
    ],
    highlight: false
  }
];

/* ================= ANIMATIONS ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

/* ================= COMPONENT ================= */
export default function Services() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen font-poppins overflow-x-hidden">

      {/* ================= HERO - Changed to Light Theme ================= */}
      <section className="pt-32 pb-20 bg-white relative overflow-hidden border-b border-slate-100">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />

        <SectionWrapper>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-montserrat font-black text-slate-900 mb-6 leading-tight"
            >
              Solutions for the <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Digital Frontier
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto"
            >
              We blend engineering, AI, and design to build scalable digital experiences that drive real business growth.
            </motion.p>
          </div>
        </SectionWrapper>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <SectionWrapper className="py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map(service => (
            <motion.div key={service.id} variants={cardVariants}>
              <div className="group h-full bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 flex-grow">
                  {service.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <FiCheck className="text-indigo-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>

                <Button className="mt-8 w-full bg-slate-50 border border-slate-200 text-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}

          {/* Custom CTA Card */}
          <motion.div variants={cardVariants}>
            <div className="h-full bg-gradient-to-br from-indigo-600 to-purple-700 p-10 rounded-[2.5rem] text-white flex flex-col justify-center text-center shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
              <p className="text-indigo-100 mb-8 leading-relaxed">
                We architect bespoke solutions tailored specifically to your unique business challenges.
              </p>
              <Button className="bg-white text-indigo-600 hover:bg-cyan-400 hover:text-white transition-colors py-4 font-bold rounded-xl shadow-lg">
                Get a Quote
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* ================= PRICING ================= */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <SectionWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 font-montserrat">
              Flexible Pricing Plans
            </h2>
            <p className="text-slate-600 text-lg">
              Transparent pricing models designed to scale with your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map(plan => (
              <div
                key={plan.name}
                className={`p-8 rounded-[2.5rem] bg-white border transition-all duration-300 ${
                  plan.highlight 
                  ? 'border-indigo-500 shadow-2xl scale-105 relative z-10' 
                  : 'border-slate-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2 text-slate-900">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{plan.bestFor}</p>
                <p className="text-4xl font-black mb-6 text-slate-900">{plan.price}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                      <FiCheck className="text-indigo-500 flex-shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  fullWidth 
                  className={plan.highlight 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600'
                  }
                >
                  Choose Plan
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-2">
              <FiInfo className="text-indigo-500" /> Prices may vary based on specific requirements
            </span>
            <span className="flex items-center gap-2">
              <FiCheck className="text-green-500" /> No hidden charges or setup fees
            </span>
          </div>
        </SectionWrapper>
      </section>

      {/* ================= FINAL CTA - Lightened Background ================= */}
      <section className="py-24">
        <SectionWrapper>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl"
          >
            {/* Background design elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-indigo-500 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-cyan-500 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6 font-montserrat">
                Let’s Build Something Exceptional
              </h2>
              <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                Book a free consultation today and get a clear technical roadmap for your next big product launch.
              </p>
              <Button className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-105 transition-transform px-12 py-5 rounded-full font-bold text-lg flex items-center gap-3 mx-auto group">
                Get a Free Quote <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </SectionWrapper>
      </section>

    </div>
  );
}