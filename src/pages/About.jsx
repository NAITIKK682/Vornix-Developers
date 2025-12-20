import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiLinkedin, FiGithub, FiCheckCircle, 
  FiTarget, FiEye, FiHeart, FiArrowRight 
} from 'react-icons/fi';
import SectionWrapper from '../components/common/SectionWrapper';
import Button from '../components/common/Button';

// --- Data Configuration ---
const team = [
  {
    name: 'Naitik Kushwaha',
    role: 'Frontend Developer',
    bio: 'Visionary architect specializing in scalable enterprise solutions and high-performance system design.',
    image: '/images/team/naitik-kushwaha.jpg',
    skills: ['React', 'Node.js', 'System Architecture'],
    linkedin: '#',
    github: '#'
  },
  
 {
    name: 'Omkar Deshmukh',
    role: 'Backend Developer',
    bio: 'Expert in visual storytelling and user-centric design systems that bridge the gap between beauty and utility.',
    image: '/images/team/omkar-deshmukh.jpg',
    skills: ['Figma', 'Adobe Suite', 'Prototyping'],
    linkedin: '#',
    github: '#'
  },

  {
    name: 'Viral Maru',
    role: 'Full Stack Developer',
    bio: 'Crafting pixel-perfect, interactive user interfaces with a focus on smooth performance and modern UX.',
    image: '/images/team/viral-maru.jpg',
    skills: ['Tailwind', 'Framer Motion', 'Next.js'],
    linkedin: '#',
    github: '#'
  },
 
  {
    name: 'Rakhmaji Gawade',
    role: 'UI/UX & Creative Designer',
    bio: 'Logic-driven engineer focused on secure API development, database optimization, and cloud infrastructure.',
    image: '/images/team/rakhmaji-gawade.jpg',
    skills: ['Python', 'PostgreSQL', 'Docker'],
    linkedin: '#',
    github: '#'
  }
];

const values = [
  { icon: <FiTarget />, title: 'Mission', text: 'To empower businesses by building high-performance digital foundations that drive growth and innovation.', color: 'from-indigo-500 to-indigo-700' },
  { icon: <FiEye />, title: 'Vision', text: 'To be the global benchmark for technical excellence and creative ingenuity in software development.', color: 'from-cyan-400 to-cyan-600' },
  { icon: <FiHeart />, title: 'Values', text: 'Rooted in transparency, continuous learning, and a relentless obsession with quality code.', color: 'from-purple-500 to-purple-700' }
];

const stats = [
  { label: 'Projects Completed', value: '120+' },
  { label: 'Happy Clients', value: '85+' },
  { label: 'Technologies', value: '25+' },
  { label: 'Lines of Code', value: '1M+' }
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function About() {
  return (
    <div className="bg-[#F8FAFC] font-poppins overflow-x-hidden min-h-screen">
      
      {/* 1. HERO SECTION - Changed from Dark to Light */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-white border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <SectionWrapper>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-indigo-600 font-montserrat font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
            >
              Elevating Digital Standards
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-montserrat font-black leading-tight mb-8 text-slate-900"
            >
              Building Better <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Digital Experiences
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Vornix Developers is a specialized collective of engineers and designers 
              dedicated to transforming bold ideas into scalable software solutions.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-indigo-200 transition-all scale-105 hover:scale-110">
                  Work With Us
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" className="border-2 border-slate-200 hover:border-indigo-600 text-slate-700 rounded-full px-8 py-4 font-bold transition-all">
                  View Our Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </SectionWrapper>
      </section>

      {/* 2. COMPANY STORY */}
      <SectionWrapper className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <h2 className="text-3xl md:text-5xl font-montserrat font-black text-[#0F172A] mb-6">
              Engineering Resilience <br /> 
              <span className="text-indigo-600">Through Innovation.</span>
            </h2>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                Founded on the principle that code should be an asset, not a liability, 
                Vornix Developers started as a group of passionate creators who wanted 
                to bridge the gap between design-heavy agencies and logic-heavy dev shops.
              </p>
              <p>
                We solve complex problems for startups and enterprises, ensuring that 
                every product we ship is secure, performant, and future-ready.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-indigo-600 transition-colors duration-500">
                  <h4 className="text-3xl font-montserrat font-black text-indigo-600 group-hover:text-white mb-1">{stat.value}</h4>
                  <p className="text-slate-500 group-hover:text-indigo-100 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* 3. MISSION VISION VALUES */}
      <div className="bg-white border-y border-slate-100 py-24">
        <SectionWrapper>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-slate-50 p-10 rounded-3xl border border-slate-200 group hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${val.color} text-white flex items-center justify-center text-2xl mb-6 shadow-lg`}>
                  {val.icon}
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-[#0F172A] mb-4">{val.title}</h3>
                <p className="text-slate-600 leading-relaxed">{val.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>
      </div>

      {/* 4. MEET THE TEAM */}
      <SectionWrapper className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-montserrat font-black text-[#0F172A] mb-4">
            The Minds Behind <span className="text-indigo-600">Vornix.</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">A multidisciplinary team driven by high standards.</p>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm group hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden bg-slate-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=Profile" }}
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-montserrat font-black text-[#0F172A] mb-1">{member.name}</h4>
                <p className="text-indigo-600 text-xs font-bold uppercase mb-4">{member.role}</p>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* 5. WHY CHOOSE US - Changed from Dark to Light/Gradient */}
      <div className="bg-slate-50 py-24 border-y border-slate-200">
        <SectionWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-montserrat font-black mb-8 leading-tight text-slate-900">
                Why Partners <br /> <span className="text-indigo-600">Trust Vornix.</span>
              </h2>
              <div className="space-y-6">
                {[
                  'Scalable Architecture from Day One',
                  'Dedicated Design & Dev Synergy',
                  'Predictable Timelines & Transparent Reports',
                  'Expertise in Cutting-Edge AI & Web3 Tech'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg">
                    <FiCheckCircle className="text-indigo-600 text-2xl flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-200">
               <p className="text-2xl font-light italic text-slate-600">
                 "We don't just write code; we build competitive advantages for brands that refuse to be ordinary."
               </p>
               {/* <div className="mt-6 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-indigo-100"></div>
                 <div>
                   <p className="font-bold text-slate-900">Naitik Kushwaha</p>
                   <p className="text-sm text-indigo-600">Founder @ Vornix</p>
                 </div>
               </div> */}
            </div>
          </div>
        </SectionWrapper>
      </div>

      {/* 6. CALL TO ACTION - Lightened for consistency */}
      <SectionWrapper className="py-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-montserrat font-black text-white mb-6">
              Ready to <span className="text-cyan-300">Scale Up?</span>
            </h2>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Let's build something that makes an impact. Our team is standing by to help.
            </p>
            <div className="flex justify-center">
              <Link to="/contact">
                <Button className="bg-white text-indigo-600 hover:bg-slate-100 px-10 py-5 rounded-full font-black text-lg flex items-center gap-3 group transition-all shadow-xl">
                  Contact Team <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}